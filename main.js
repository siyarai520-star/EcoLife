/* =========================
   EcoLife - Main JavaScript
========================= */

document.addEventListener("DOMContentLoaded", function () {

    // 1. Mobile Navigation Menu
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("open");

            const isOpen = navLinks.classList.contains("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            });
        });
    }

    // 2. Automatically Highlight Current Page
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(function (link) {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });

    // 3. Carbon Footprint Calculator
    const carbonForm = document.getElementById("carbonForm");
    const carbonResult = document.getElementById("carbonResult");

    if (carbonForm && carbonResult) {
        carbonForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const electricity = Math.max(
                0,
                Number(document.getElementById("electricity")?.value) || 0
            );

            const travel = Math.max(
                0,
                Number(document.getElementById("travel")?.value) || 0
            );

            const meat = document.getElementById("meat")?.value || "low";

            /*
             * These are illustrative factors, not an official
             * carbon-footprint assessment.
             * Electricity: 0.7 kg CO2 per kWh
             * Travel: 0.2 kg CO2 per km
             * Food: simplified daily estimate
             */
            const foodFactors = {
                low: 1,
                medium: 2,
                high: 3
            };

            const electricityEmission = electricity * 0.7;
            const travelEmission = travel * 0.2;
            const foodEmission = foodFactors[meat] || 1;

            const dailyTotal =
                electricityEmission + travelEmission + foodEmission;

            carbonResult.innerHTML = `
                <h3>Your Estimated Daily Footprint</h3>
                <p class="result-value">
                    ${dailyTotal.toFixed(2)} kg CO₂
                </p>
                <p>Electricity: ${electricityEmission.toFixed(2)} kg CO₂</p>
                <p>Travel: ${travelEmission.toFixed(2)} kg CO₂</p>
                <p>Food estimate: ${foodEmission.toFixed(2)} kg CO₂</p>
                <p><small>
                    This is a simplified educational estimate.
                    Actual emissions depend on your location, energy source,
                    transport type and food choices.
                </small></p>
            `;

            carbonResult.classList.add("show");
        });
    }

    // 4. Daily Eco Tracker
    const tracker = document.getElementById("ecoTracker");
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");

    if (tracker && progressFill && progressText) {
        const checkboxes = tracker.querySelectorAll(
            'input[type="checkbox"]'
        );

        function updateProgress() {
            const total = checkboxes.length;

            const completed = Array.from(checkboxes).filter(
                function (checkbox) {
                    return checkbox.checked;
                }
            ).length;

            const percentage = total
                ? Math.round((completed / total) * 100)
                : 0;

            progressFill.style.width = percentage + "%";
            progressText.textContent =
                `${completed} of ${total} eco-friendly habits completed (${percentage}%)`;

            // Save today's progress in this browser
            const today = new Date().toISOString().slice(0, 10);

            const savedState = {};

            checkboxes.forEach(function (checkbox, index) {
                savedState[index] = checkbox.checked;
            });

            try {
                localStorage.setItem(
                    "ecoTracker-" + today,
                    JSON.stringify(savedState)
                );
            } catch (error) {
                console.warn("Tracker progress could not be saved.");
            }
        }

        // Restore today's progress
        const today = new Date().toISOString().slice(0, 10);

        try {
            const saved = localStorage.getItem("ecoTracker-" + today);

            if (saved) {
                const savedState = JSON.parse(saved);

                checkboxes.forEach(function (checkbox, index) {
                    checkbox.checked = Boolean(savedState[index]);
                });
            }
        } catch (error) {
            console.warn("Saved tracker progress could not be loaded.");
        }

        checkboxes.forEach(function (checkbox) {
            checkbox.addEventListener("change", updateProgress);
        });

        updateProgress();
    }

    // 5. Eco Challenge Buttons
    document.querySelectorAll("[data-challenge]").forEach(function (button) {
        button.addEventListener("click", function () {
            const challengeName =
                button.getAttribute("data-challenge") || "Eco Challenge";

            button.textContent = "Challenge Selected ✓";
            button.disabled = true;
            button.setAttribute("aria-label", challengeName + " selected");
        });
    });

    // 6. Contact Form Demo
    const contactForm = document.getElementById("contactForm");
    const contactMessage = document.getElementById("contactMessage");

    if (contactForm && contactMessage) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            contactMessage.textContent =
                "Thank you! This demo form is working, but it does not send messages to a server.";

            contactForm.reset();
        });
    }

});