# Simple-Living-Creatures-Web-Simulation-
This simple web application tries to emulate a simple ecossystem where creatures with a simple "intelligence", can "live".

***    This creatures have different stats:

            * Speed: the overall speed of the creature, 
                        having more speed increases the chance to get a mate to reproduce and get food;

            * Health: the overall health of the creature,
                        this stat decreases over time and can be increased by eating food,
                            when 0 the creature dies;

            * Age: the "age" of the creature,
                        the life of all creatures is divided in two phases: Child and Adult,
                            Childs can't reproduce;

            * State: the actual state of the creature,
                        divided in three states: 
                            Roaming - when the creature is normal, just searching for food and mates,
                            Pregnant - observable only in females, while pregnant 
                                            (the growing circle inside them indicates the baby state)
                            Dying - when the creature's health is below 40, the state changes to dying;

    ***    The creatures can be Male (Blue Squares), Female (Pink Squares) or a Predator(Grey Squares) with little differences between them.
            
            * Males in general have more speed than Females;

            * Females in general have more health;

            * A Female creature, when on field of view of a Male, can get pregnant. While in this state,
                the female can't get pregnant again. When the time to give birth comes, the female have equal
                    probability of having a Male or a Female child;

            * Predators can only be spawned by the user, they don't eat the creature's food, 
                they eat the creatures as well as the other predators who have less health;

            * The Predators have more speed than all the other creatures but have less health;

    ***    You can interact with the creature's world:

            * Top Left - Dropdown Menu:

                * RESTART - restart the creature's world;

                * FEED - when selected you can tap on the world to spawn a food to feed the creatures;

                * SPAWN RANDOM CREATURE - when selected you can tap on the world to spawn a random creature
                                            (Male or Female); 

                * SPAWN MALE CREATURE - when selected you can tap on the world to spawn a male creature; 

                * SPAWN FEMALE CREATURE - when selected you can tap on the world to spawn a female creature; 

                * SPAWN PREDATOR - when selected you can tap on the world to spawn a predator; 

            * Top Right - Checkbox:

                * AUTO - FEED: when checked, random food will be appearing on the creature's word on a timed interval;
    *** Tips:
            
            * If you think that there's too many creatures, try to uncheck the auto-feed button, 
                females with lower health are dying, and can't get pregnant.
                    Other way is spawning a predator to eat the creatures, you can do this by
                        selecting the SPAWN PREDATOR option on the top left dropdown menu;
                
            * You can have more influence on the simulation if you uncheck the top right button, and
                feed the creature's yourself with the feed option within the top left dropdown;
            
            * You can start a new simulation if you select the restart option on the top left dropdown;

            * Have fun!
            
    *** Files:
           
           * index.html           - Open this file on a web browser to run this web application.
           * style.css            - All the css styling used in this application is inside this file.
           * AppManager.js        - Manages all the processes needed for the simulation world.
           * UIManager.js         - Manages all the interactions between the user and the User Interface.
           * CreatureManager.js   - Manages all the different creatures. (movement,drawing,etc.)
           * DrawManager.js       - Contains all the drawing functions.
           * Creature.js          - Blueprint for all the different creatures.
           * MaleCreature.js      - Blueprint for all the Male creatures.
           * FemaleCreature.js    - Blueprint for all the Female creatures.
           * Predator.js          - Blueprint for all the Predator creatures.
           * FoodManager.js       - Manages all the food present in the world.
           * Food.js              - Blueprint for all the food.
