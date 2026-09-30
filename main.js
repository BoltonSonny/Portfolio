document.addEventListener("DOMContentLoaded", function () {


/* =========================================================
   PROJECT SYSTEM
========================================================= */

var featuredContainer = document.getElementById("featured-projects");
var projectsContainer = document.getElementById("projects-grid");
var filtersContainer = document.getElementById("project-filters");

var projectData = window.projects || [];


/* =========================================================
   PROJECT CARDS
========================================================= */

function createProjectCard(project) {

    var card = document.createElement("article");
    card.className = "project-card";


    /* Project image */

    if (project.image) {

        var imageWrapper = document.createElement("div");
        imageWrapper.className = "project-card-image";

        var image = document.createElement("img");

        image.src = project.image;
        image.alt = project.title || "Project image";
        image.loading = "lazy";

        imageWrapper.appendChild(image);
        card.appendChild(imageWrapper);
    }


    /* Project content */

    var content = document.createElement("div");
    content.className = "project-card-content";


    /* Title */

    var title = document.createElement("h3");

    title.textContent =
        project.title || "Untitled Project";

    content.appendChild(title);


    /* Description */

    var description = document.createElement("p");

    description.textContent =
        project.description || "";

    content.appendChild(description);


    /* Tags */

    var tagsContainer =
        document.createElement("div");

    tagsContainer.className = "project-tags";


    if (Array.isArray(project.tags)) {

        project.tags.forEach(function (tag) {

            var tagElement =
                document.createElement("span");

            tagElement.className = "project-tag";

            tagElement.textContent = tag;

            tagsContainer.appendChild(tagElement);

        });
    }


    content.appendChild(tagsContainer);

    card.appendChild(content);


    /* =====================================================
       PROJECT CLICK
    ===================================================== */

    card.style.cursor = "pointer";

    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");


    card.addEventListener("click", function () {

        openProjectModal(project);

    });


    /* Keyboard accessibility */

    card.addEventListener("keydown", function (event) {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            openProjectModal(project);

        }

    });


    return card;
}


/* =========================================================
   PROJECT MODAL
========================================================= */

var projectModal = null;


/* Create project modal */

function createProjectModal() {

    if (document.getElementById("project-modal")) {
        projectModal =
            document.getElementById("project-modal");

        return;
    }


    var modal =
        document.createElement("div");

    modal.id = "project-modal";
    modal.className = "project-modal";

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    modal.innerHTML = `

        <div class="project-modal-overlay"></div>

        <div
            class="project-modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
        >

            <button
                type="button"
                class="project-modal-close"
                aria-label="Close project"
            >
                <i class="fa-solid fa-xmark"></i>
            </button>


            <div class="project-modal-header">

                <div class="section-label">
                    PROJECT
                </div>

                <h2 id="project-modal-title"></h2>

                <p
                    id="project-modal-description"
                    class="project-modal-description"
                ></p>

            </div>


            <div
                id="project-modal-body"
                class="project-modal-body"
            ></div>

        </div>
    `;


    document.body.appendChild(modal);

    projectModal = modal;


    /* Close button */

    var closeButton =
        modal.querySelector(
            ".project-modal-close"
        );

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeProjectModal
        );

    }


    /* Overlay */

    var overlay =
        modal.querySelector(
            ".project-modal-overlay"
        );

    if (overlay) {

        overlay.addEventListener(
            "click",
            closeProjectModal
        );

    }

}


/* =========================================================
   OPEN PROJECT MODAL
========================================================= */

function openProjectModal(project) {

    createProjectModal();


    if (!projectModal) {
        return;
    }


    var title =
        projectModal.querySelector(
            "#project-modal-title"
        );


    var description =
        projectModal.querySelector(
            "#project-modal-description"
        );


    var body =
        projectModal.querySelector(
            "#project-modal-body"
        );


    if (!title || !description || !body) {
        return;
    }


    /* Clear previous project */

    body.innerHTML = "";


    /* Project title */

    title.textContent =
        project.title ||
        "Untitled Project";


    /* Project description */

    description.textContent =
        project.description ||
        "";


    /* =====================================================
       PROJECT DETAILS TEXT
    ===================================================== */

    if (
        project.details &&
        project.details.text
    ) {

        var textSection =
            document.createElement("div");

        textSection.className =
            "project-modal-text";

        textSection.innerHTML =
            project.details.text;

        body.appendChild(textSection);

    }


    /* =====================================================
       PROJECT IMAGES
    ===================================================== */

    if (
        project.details &&
        Array.isArray(project.details.images) &&
        project.details.images.length > 0
    ) {

        var imagesSection =
            document.createElement("div");

        imagesSection.className =
            "project-modal-media";


        project.details.images.forEach(
            function (imageSrc) {

                if (!imageSrc) {
                    return;
                }


                var image =
                    document.createElement("img");

                image.src = imageSrc;

                image.alt =
                    project.title +
                    " project image";

                image.loading = "lazy";


                imagesSection.appendChild(image);

            }
        );


        body.appendChild(imagesSection);

    }


    /* =====================================================
       PROJECT VIDEOS
    ===================================================== */

    if (
        project.details &&
        Array.isArray(project.details.videos) &&
        project.details.videos.length > 0
    ) {

        var videosSection =
            document.createElement("div");

        videosSection.className =
            "project-modal-videos";


        project.details.videos.forEach(
            function (videoSrc) {

                if (!videoSrc) {
                    return;
                }


                var video =
                    document.createElement("video");

                video.src = videoSrc;

                video.controls = true;

                video.preload = "metadata";

                video.playsInline = true;


                videosSection.appendChild(video);

            }
        );


        body.appendChild(videosSection);

    }


    /* =====================================================
       PROJECT TAGS
    ===================================================== */

    if (
        Array.isArray(project.tags) &&
        project.tags.length > 0
    ) {

        var tagsSection =
            document.createElement("div");

        tagsSection.className =
            "project-modal-tags";


        project.tags.forEach(
            function (tag) {

                if (!tag) {
                    return;
                }


                var tagElement =
                    document.createElement("span");

                tagElement.className =
                    "project-tag";

                tagElement.textContent =
                    tag;


                tagsSection.appendChild(
                    tagElement
                );

            }
        );


        body.appendChild(tagsSection);

    }


    /* =====================================================
       PROJECT STATUS
    ===================================================== */

    if (project.status) {

        var statusSection =
            document.createElement("div");

        statusSection.className =
            "project-modal-status";


        statusSection.innerHTML = `
            <strong>Status:</strong>
            <span>${project.status}</span>
        `;


        body.appendChild(statusSection);

    }


    /* =====================================================
       PROJECT LINK
    ===================================================== */

    if (
        project.link &&
        project.link !== "#"
    ) {

        var linkSection =
            document.createElement("div");

        linkSection.className =
            "project-modal-link";


        var projectLink =
            document.createElement("a");

        projectLink.href =
            project.link;

        projectLink.target =
            "_blank";

        projectLink.rel =
            "noopener noreferrer";

        projectLink.className =
            "button button-primary";

        projectLink.innerHTML = `
            View Project
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
        `;


        linkSection.appendChild(
            projectLink
        );

        body.appendChild(
            linkSection
        );

    }


    /* =====================================================
       SHOW MODAL
    ===================================================== */

    projectModal.classList.add("active");

    projectModal.setAttribute(
        "aria-hidden",
        "false"
    );


    /* Prevent background scrolling */

    document.body.style.overflow =
        "hidden";


    /* Focus close button */

    var closeButton =
        projectModal.querySelector(
            ".project-modal-close"
        );


    if (closeButton) {

        setTimeout(
            function () {

                closeButton.focus();

            },
            50
        );

    }

}


/* =========================================================
   CLOSE PROJECT MODAL
========================================================= */

function closeProjectModal() {

    if (!projectModal) {
        return;
    }


    projectModal.classList.remove(
        "active"
    );


    projectModal.setAttribute(
        "aria-hidden",
        "true"
    );


    /* Re-enable scrolling */

    document.body.style.overflow =
        "";


    /* Stop videos */

    var videos =
        projectModal.querySelectorAll(
            "video"
        );


    videos.forEach(
        function (video) {

            video.pause();

            video.currentTime = 0;

        }
    );

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            projectModal &&
            projectModal.classList.contains(
                "active"
            )
        ) {

            closeProjectModal();

        }

    }
);


/* =========================================================
   FEATURED PROJECTS
========================================================= */

function renderFeaturedProjects() {

    if (!featuredContainer) {
        return;
    }


    featuredContainer.innerHTML = "";


    projectData.forEach(
        function (project) {

            if (project.featured === true) {

                featuredContainer.appendChild(
                    createProjectCard(project)
                );

            }

        }
    );

}


/* =========================================================
   ALL PROJECTS
========================================================= */

function renderProjects(filter) {

    if (!projectsContainer) {
        return;
    }


    projectsContainer.innerHTML = "";


    projectData.forEach(
        function (project) {

            var showProject =
                false;


            if (filter === "all") {

                showProject =
                    true;

            }

            else if (
                Array.isArray(project.tags) &&
                project.tags.indexOf(filter) !== -1
            ) {

                showProject =
                    true;

            }


            if (showProject) {

                projectsContainer.appendChild(
                    createProjectCard(project)
                );

            }

        }
    );

}


/* =========================================================
   PROJECT FILTERS
========================================================= */

function createFilters() {

    if (!filtersContainer) {
        return;
    }


    filtersContainer.innerHTML = "";


    var allTags = [];


    projectData.forEach(
        function (project) {

            if (!Array.isArray(project.tags)) {
                return;
            }


            project.tags.forEach(
                function (tag) {

                    if (
                        allTags.indexOf(tag) === -1
                    ) {

                        allTags.push(tag);

                    }

                }
            );

        }
    );


    /* =====================================================
       ALL BUTTON
    ===================================================== */

    var allButton =
        document.createElement("button");

    allButton.type =
        "button";

    allButton.className =
        "filter-button active";

    allButton.textContent =
        "All";

    allButton.dataset.filter =
        "all";


    filtersContainer.appendChild(
        allButton
    );


    /* =====================================================
       TAG BUTTONS
    ===================================================== */

    allTags.forEach(
        function (tag) {

            var button =
                document.createElement("button");

            button.type =
                "button";

            button.className =
                "filter-button";

            button.textContent =
                tag;

            button.dataset.filter =
                tag;


            filtersContainer.appendChild(
                button
            );

        }
    );


    /* =====================================================
       FILTER CLICK
    ===================================================== */

    filtersContainer.addEventListener(
        "click",
        function (event) {

            var button =
                event.target.closest(
                    ".filter-button"
                );


            if (!button) {
                return;
            }


            var buttons =
                filtersContainer.querySelectorAll(
                    ".filter-button"
                );


            buttons.forEach(
                function (filterButton) {

                    filterButton.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add(
                "active"
            );


            renderProjects(
                button.dataset.filter
            );

        }
    );

}


/* =========================================================
   EMAIL MODAL
========================================================= */

var EMAIL =
    "sonnyjcb2006@hotmail.com";


var emailModal =
    document.getElementById(
        "email-modal"
    );


var contactEmailButton =
    document.getElementById(
        "contact-email-button"
    );


var closeEmailButton =
    document.getElementById(
        "close-email-button"
    );


var emailModalClose =
    document.getElementById(
        "email-modal-close"
    );


var emailModalOverlay =
    document.getElementById(
        "email-modal-overlay"
    );


var copyEmailButton =
    document.getElementById(
        "copy-email"
    );


var emailAddress =
    document.getElementById(
        "email-address"
    );


var copyStatus =
    document.getElementById(
        "copy-status"
    );


/* =========================================================
   OPEN EMAIL MODAL
========================================================= */

function openEmailModal() {

    if (!emailModal) {
        return;
    }


    emailModal.classList.add(
        "active"
    );


    emailModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";


    if (emailModalClose) {

        setTimeout(
            function () {

                emailModalClose.focus();

            },
            50
        );

    }

}


/* =========================================================
   CLOSE EMAIL MODAL
========================================================= */

function closeEmailModal() {

    if (!emailModal) {
        return;
    }


    emailModal.classList.remove(
        "active"
    );


    emailModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";


    if (copyStatus) {

        copyStatus.classList.remove(
            "visible"
        );

    }

}


/* =========================================================
   CONTACT BUTTON
========================================================= */

if (contactEmailButton) {

    contactEmailButton.addEventListener(
        "click",
        openEmailModal
    );

}


/* =========================================================
   CLOSE BUTTON
========================================================= */

if (closeEmailButton) {

    closeEmailButton.addEventListener(
        "click",
        closeEmailModal
    );

}


/* =========================================================
   X BUTTON
========================================================= */

if (emailModalClose) {

    emailModalClose.addEventListener(
        "click",
        closeEmailModal
    );

}


/* =========================================================
   MODAL OVERLAY
========================================================= */

if (emailModalOverlay) {

    emailModalOverlay.addEventListener(
        "click",
        closeEmailModal
    );

}


/* =========================================================
   EMAIL ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            emailModal &&
            emailModal.classList.contains(
                "active"
            )
        ) {

            closeEmailModal();

        }

    }
);


/* =========================================================
   COPY EMAIL
========================================================= */

if (copyEmailButton) {

    copyEmailButton.addEventListener(
        "click",
        function () {

            if (
                navigator.clipboard &&
                navigator.clipboard.writeText
            ) {

                navigator.clipboard
                    .writeText(EMAIL)
                    .then(
                        function () {

                            if (!copyStatus) {
                                return;
                            }


                            copyStatus.classList.add(
                                "visible"
                            );


                            setTimeout(
                                function () {

                                    copyStatus.classList.remove(
                                        "visible"
                                    );

                                },
                                2000
                            );

                        }
                    )
                    .catch(
                        function () {

                            selectEmail();

                        }
                    );

            }

            else {

                selectEmail();

            }

        }
    );

}


/* =========================================================
   FALLBACK EMAIL SELECTION
========================================================= */

function selectEmail() {

    if (!emailAddress) {
        return;
    }


    var selection =
        window.getSelection();


    var range =
        document.createRange();


    range.selectNodeContents(
        emailAddress
    );


    selection.removeAllRanges();


    selection.addRange(
        range
    );

}


/* =========================================================
   INITIALISE
========================================================= */

renderFeaturedProjects();

createFilters();

renderProjects("all");


});