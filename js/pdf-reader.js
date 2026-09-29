/* =========================================================
   PDF READER MODULE — BULLETPROOF VERSION
   Campus Calendar
   Works on Browser + Capacitor + Mobile + Offline
   ========================================================= */

(function () {
    "use strict";

    // =========================================================
    // STATE
    // =========================================================

    let pdfDoc = null;
    let currentPage = 1;
    let currentScale = 1.5;
    let pdfJsLib = null;
    let isLoading = false;

    // =========================================================
    // DOM ELEMENTS
    // =========================================================

    const modal = document.getElementById("pdfReaderModal");
    const canvas = document.getElementById("pdfCanvas");
    const pageInfo = document.getElementById("pdfPageInfo");
    const prevBtn = document.getElementById("pdfPrevBtn");
    const nextBtn = document.getElementById("pdfNextBtn");
    const zoomIn = document.getElementById("pdfZoomIn");
    const zoomOut = document.getElementById("pdfZoomOut");
    const closeBtn = document.getElementById("pdfCloseBtn");
    const readerBtn = document.getElementById("pdfReaderBtn");
    const fileInput = document.getElementById("pdfFileInput");

    // Safety check
    if (!modal || !canvas) {
        console.warn("⚠️ PDF Reader: Required elements not found");
        return;
    }

    // =========================================================
    // LOAD PDF.JS — MULTIPLE FALLBACK METHOD
    // =========================================================

    async function loadPdfJs() {
        if (pdfJsLib) return pdfJsLib;
        if (isLoading) {
            while (isLoading) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            return pdfJsLib;
        }

        isLoading = true;

        // =========================================================
        // METHOD 1: Check if already loaded via <script> tag
        // =========================================================

        if (typeof window.pdfjsLib !== "undefined") {
            console.log("✅ PDF.js found via window.pdfjsLib");
            pdfJsLib = window.pdfjsLib;
            if (pdfJsLib.GlobalWorkerOptions) {
                pdfJsLib.GlobalWorkerOptions.workerSrc =
                    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
            }
            isLoading = false;
            return pdfJsLib;
        }

        // =========================================================
        // METHOD 2: Load via classic <script> tag (BEST for Capacitor)
        // =========================================================

        const cdnList = [
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
            "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js",
            "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.min.js"
        ];

        const workerList = [
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",
            "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js",
            "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"
        ];

        for (let i = 0; i < cdnList.length; i++) {
            try {
                console.log(`🔄 Trying PDF.js from CDN ${i + 1}: ${cdnList[i]}`);

                await loadScript(cdnList[i]);

                if (typeof window.pdfjsLib !== "undefined") {
                    pdfJsLib = window.pdfjsLib;

                    if (pdfJsLib.GlobalWorkerOptions) {
                        pdfJsLib.GlobalWorkerOptions.workerSrc = workerList[i];
                    }

                    console.log(`✅ PDF.js loaded successfully from CDN ${i + 1}`);
                    isLoading = false;
                    return pdfJsLib;
                }
            } catch (error) {
                console.warn(`❌ CDN ${i + 1} failed:`, error.message);
            }
        }

        // =========================================================
        // METHOD 3: Try dynamic import (ES module fallback)
        // =========================================================

        const moduleList = [
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.mjs",
            "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.mjs"
        ];

        for (let i = 0; i < moduleList.length; i++) {
            try {
                console.log(`🔄 Trying PDF.js module ${i + 1}: ${moduleList[i]}`);

                const module = await import(/* @vite-ignore */ moduleList[i]);

                if (module && module.getDocument) {
                    pdfJsLib = module;
                    if (pdfJsLib.GlobalWorkerOptions) {
                        pdfJsLib.GlobalWorkerOptions.workerSrc =
                            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.mjs";
                    }
                    console.log(`✅ PDF.js module loaded successfully`);
                    isLoading = false;
                    return pdfJsLib;
                }
            } catch (error) {
                console.warn(`❌ Module ${i + 1} failed:`, error.message);
            }
        }

        isLoading = false;
        throw new Error("PDF.js could not be loaded. Please check your internet connection.");
    }

    // =========================================================
    // LOAD SCRIPT HELPER
    // =========================================================

    function loadScript(url) {
        return new Promise((resolve, reject) => {
            // Check if script already exists
            const existing = document.querySelector(`script[src="${url}"]`);
            if (existing) {
                // Already exists, maybe loaded
                if (typeof window.pdfjsLib !== "undefined") {
                    resolve();
                    return;
                }
            }

            const script = document.createElement("script");
            script.src = url;
            script.async = true;

            const timeout = setTimeout(() => {
                script.remove();
                reject(new Error("Script load timeout"));
            }, 15000);

            script.onload = () => {
                clearTimeout(timeout);
                resolve();
            };

            script.onerror = () => {
                clearTimeout(timeout);
                script.remove();
                reject(new Error("Script load error"));
            };

            document.head.appendChild(script);
        });
    }

    // =========================================================
    // RENDER PAGE
    // =========================================================

    async function renderPage(pageNumber) {
        if (!pdfDoc) return;

        try {
            const page = await pdfDoc.getPage(pageNumber);
            const viewport = page.getViewport({ scale: currentScale });

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const context = canvas.getContext("2d");
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            await page.render(renderContext).promise;

            currentPage = pageNumber;
            updatePageInfo();
            updateButtons();

            const body = modal.querySelector(".pdf-reader-body");
            if (body) body.scrollTop = 0;

        } catch (error) {
            console.error("❌ Failed to render page:", error);
            showPdfToast("Failed to render page");
        }
    }

    // =========================================================
    // UPDATE PAGE INFO
    // =========================================================

    function updatePageInfo() {
        if (pageInfo && pdfDoc) {
            pageInfo.textContent = `Page ${currentPage} / ${pdfDoc.numPages}`;
        }
    }

    // =========================================================
    // UPDATE BUTTONS
    // =========================================================

    function updateButtons() {
        if (prevBtn) {
            prevBtn.disabled = currentPage <= 1;
            prevBtn.style.opacity = currentPage <= 1 ? "0.4" : "1";
        }
        if (nextBtn) {
            nextBtn.disabled = currentPage >= pdfDoc.numPages;
            nextBtn.style.opacity = currentPage >= pdfDoc.numPages ? "0.4" : "1";
        }
    }

    // =========================================================
    // OPEN PDF
    // =========================================================

    async function openPdf(file) {
        if (!file) return;

        if (
            file.type !== "application/pdf" &&
            !file.name.toLowerCase().endsWith(".pdf")
        ) {
            showPdfToast("Please select a valid PDF file");
            return;
        }

        modal.classList.add("active");
        const body = modal.querySelector(".pdf-reader-body");

        if (body) {
            body.innerHTML = `
                <div class="pdf-reader-loading">
                    <div class="spinner"></div>
                    <p>Loading PDF...</p>
                </div>
            `;
        }

        try {
            const lib = await loadPdfJs();
            const arrayBuffer = await file.arrayBuffer();

            pdfDoc = await lib.getDocument({ data: arrayBuffer }).promise;
            currentPage = 1;

            if (body) {
                body.innerHTML = "";
                body.appendChild(canvas);
            }

            await renderPage(1);

            console.log(`✅ PDF loaded: ${pdfDoc.numPages} pages`);

        } catch (error) {
            console.error("❌ PDF load error:", error);
            if (body) {
                body.innerHTML = `
                    <div class="pdf-reader-error">
                        <span class="icon">⚠️</span>
                        <h3>Failed to load PDF</h3>
                        <p>${escapeHtml(error.message || "Unknown error occurred")}</p>
                    </div>
                `;
            }
        }
    }

    // =========================================================
    // CLOSE PDF
    // =========================================================

    function closePdf() {
        modal.classList.remove("active");
        pdfDoc = null;
        currentPage = 1;
        if (canvas) {
            canvas.width = 0;
            canvas.height = 0;
        }
        if (fileInput) fileInput.value = "";
    }

    // =========================================================
    // HELPERS
    // =========================================================

    function showPdfToast(message) {
        if (typeof showToast === "function") {
            showToast(message);
        } else {
            console.log(message);
        }
    }

    function escapeHtml(str) {
        return String(str || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // =========================================================
    // EVENT LISTENERS
    // =========================================================

    if (readerBtn) {
        readerBtn.addEventListener("click", () => {
            if (fileInput) fileInput.click();
        });
    }

    if (fileInput) {
        fileInput.addEventListener("change", (e) => {
            const file = e.target.files?.[0];
            if (file) {
                openPdf(file);
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                renderPage(currentPage - 1);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (pdfDoc && currentPage < pdfDoc.numPages) {
                renderPage(currentPage + 1);
            }
        });
    }

    if (zoomIn) {
        zoomIn.addEventListener("click", () => {
            if (currentScale < 4) {
                currentScale = Math.min(4, currentScale + 0.25);
                renderPage(currentPage);
            }
        });
    }

    if (zoomOut) {
        zoomOut.addEventListener("click", () => {
            if (currentScale > 0.5) {
                currentScale = Math.max(0.5, currentScale - 0.25);
                renderPage(currentPage);
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closePdf);
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closePdf();
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closePdf();
        }

        if (modal.classList.contains("active") && pdfDoc) {
            if (e.key === "ArrowLeft") {
                if (currentPage > 1) renderPage(currentPage - 1);
            } else if (e.key === "ArrowRight") {
                if (currentPage < pdfDoc.numPages) renderPage(currentPage + 1);
            } else if (e.key === "+" || e.key === "=") {
                if (currentScale < 4) {
                    currentScale = Math.min(4, currentScale + 0.25);
                    renderPage(currentPage);
                }
            } else if (e.key === "-") {
                if (currentScale > 0.5) {
                    currentScale = Math.max(0.5, currentScale - 0.25);
                    renderPage(currentPage);
                }
            }
        }
    });

    // =========================================================
    // DRAG & DROP
    // =========================================================

    if (modal) {
        modal.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        modal.addEventListener("drop", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const file = e.dataTransfer?.files?.[0];
            if (file) openPdf(file);
        });
    }

    // =========================================================
    // EXPOSE GLOBAL
    // =========================================================

    window.openPdf = openPdf;
    window.closePdf = closePdf;

    console.log("✅ PDF Reader module initialized");

})();