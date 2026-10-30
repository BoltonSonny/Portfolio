window.projects = [
    {
        id: "360-immersive-project",

        title: "360 Immersive Project",

        description:
            "360 VR Video for Lichfield College and South Staffordshire County Council.",

        image: "images/360-immersive-project.png",

        featured: true,

        tags: [
            "Premier Pro",
            "Digital Media Production",
            "Collaboration & Teamwork",
            "Video Editing"
        ],

        status: "Completed",

        link: "#",

        // Project popup content
        details: {
            text: `
                <p>
                    As a Student Digital Champion, I contributed to the creation of a 360° immersive video project for Lichfield College and Staffordshire County Council. My role involved supporting the video production process, editing footage and helping develop the overall digital media experience to create an engaging and immersive final product.
                </p>

                <p>
                    Through this project, I gained practical experience in digital content creation and multimedia production, developing my understanding of how video footage can be edited and presented to deliver an effective visual experience. I also strengthened my technical skills, attention to detail and ability to contribute to a collaborative project, while gaining valuable insight into the planning and delivery of digital media for external organizations.
                </p>

                <p>
                    This experience helped me build confidence in applying digital skills to a real-world project, improve my creative problem-solving abilities and develop a stronger understanding of the digital media production process. It also reinforced the importance of communication, teamwork and adapting technical work to meet the aims of a project.
                </p>
            `,

            images: [
                "images/360-project-1.png",
                "images/360-project-2.png"
            ],

            videos: [
                "videos/360-project.mp4"
            ]
        }
    },

    {
        id: "rollout",

        title: "ROLLOUT",

        description:
            "An Arcady Skateboard Speedrun game im building on steam.",

        image: "images/rollout.png",

        featured: true,

        tags: [ 
            "Unity",
            "Game-Development",
            "C++"
        ],

        status: "In Development",

        link: "https://store.steampowered.com/app/4294240/ROLLOUT/",

        // Project popup content
        details: {
            text: `
                <p>
                    This is my own personal project that im building inside of unity as a fun little arcady game where you can build tracks and compete against others in leaderboards. During this project my Main Challenge was figuring out the physics for the skateboard itself and managing to get it to feel right in the end I settled on faking it with using a ball for the physics of how it moves.
                </p>

                <p>
                    The biggest thing I had to learn was how to Intergrate steam API into my project with being able to save player times onto steam cloud and be able to order and pull them into the games UI based on times and what the track ID is. Overall while working on this project ive had to deeply research into documentation for Unity Custom Physics and learn how to use the New Unity Input System as I was use to using the old version of the Inputs.
                </p>
            `,

            images: [
                "images/rollout-1.png",
                "images/rollout-2.png"
                
            ],

            videos: [
                "videos/rollout-video.mp4"
            ]
        }
    },

    {
        id: "minishell",

        title: "MiniShell",

        description:
            "Simple Remake of Command Prompt that can do the basic tasks like check directory, ssh, cd, add and remove files and folders.",

        image: "images/minishell.png",

        featured: false,

        tags: [ 
            "C++",
            "Software-Development"
        ],

        status: "Completed",

        link: "https://github.com/BoltonSonny/MiniShell",

        // Project popup content
        details: {
            text: `
                <p>
                    For this project I wanted to challenge myself and improve my knowledge on C++ by making a copy of the Windows Terminal but in a way that looks cool to me but also useful with only the tools I really wanted to use for example being able to SSH into another system or by able to move into another folder and be able to add or remove files.
                </p>

                <p>
                    Being able to mess around with built in windows functions and adding them to a working terminal was difficult to learn but after some research into how to implement it and actually implementing it myself, I found it to be actually useful to learn as it allows for further development into difficult tools and ways to improve certain software and tailor it to a users needs.
                </p>
            `,

            images: [
                "images/terminal.png"
                
                
            ],

            videos: [
                "videos/terminal-video.mp4"
            ]
        }
    }
];