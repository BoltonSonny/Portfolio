document.addEventListener("DOMContentLoaded", function () {


/* =========================================================
   PROJECT SYSTEM
========================================================= */

var featuredContainer = document.getElementById("featured-projects");
var projectsContainer = document.getElementById("projects-grid");
var filtersContainer = document.getElementById("project-filters");

var projectData = window.projects || [];


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

    title.textContent = project.title || "Untitled Project";

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


    /* Project link */

    if (
        project.link &&
        project.link !== "#"
    ) {

        card.style.cursor = "pointer";

        card.addEventListener(
            "click",
            function () {

                window.location.href =
                    project.link;

            }
        );
    }


    return card;
}


/* =========================================================
   FEATURED PROJECTS
========================================================= */

function renderFeaturedProjects() {

    if (!featuredContainer) {
        return;
    }


    featuredContainer.innerHTML = "";


    projectData.forEach(function (project) {

        if (project.featured === true) {

            featuredContainer.appendChild(
                createProjectCard(project)
            );

        }

    });
}


/* =========================================================
   ALL PROJECTS
========================================================= */

function renderProjects(filter) {

    if (!projectsContainer) {
        return;
    }


    projectsContainer.innerHTML = "";


    projectData.forEach(function (project) {

        var showProject = false;


        if (filter === "all") {

            showProject = true;

        } else if (
            Array.isArray(project.tags) &&
            project.tags.indexOf(filter) !== -1
        ) {

            showProject = true;

        }


        if (showProject) {

            projectsContainer.appendChild(
                createProjectCard(project)
            );

        }

    });
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


    projectData.forEach(function (project) {

        if (!Array.isArray(project.tags)) {
            return;
        }


        project.tags.forEach(function (tag) {

            if (allTags.indexOf(tag) === -1) {

                allTags.push(tag);

            }

        });

    });


    /* All button */

    var allButton =
        document.createElement("button");

    allButton.type = "button";

    allButton.className =
        "filter-button active";

    allButton.textContent = "All";

    allButton.dataset.filter = "all";

    filtersContainer.appendChild(
        allButton
    );


    /* Tag buttons */

    allTags.forEach(function (tag) {

        var button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "filter-button";

        button.textContent = tag;

        button.dataset.filter = tag;

        filtersContainer.appendChild(
            button
        );

    });


    /* Filter click */

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


            button.classList.add("active");


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
   ESCAPE KEY
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

            } else {

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

    selection.addRange(range);

}


/* =========================================================
   INITIALISE
========================================================= */

renderFeaturedProjects();

createFilters();

renderProjects("all");


});