document.addEventListener('DOMContentLoaded', () => {
    const k1dfun = document.getElementById('K1dfun');
    const fallingContainer = document.body;
    const counterElement = document.querySelector('#counter h3');
    const upgradeButton = document.getElementById('upgradeButton');
    const autoclickerButton = document.getElementById('autoclickerButton');
    const autoclickerSpeedButton = document.getElementById('autoclickerSpeedButton');
    const imageUpgradeButton = document.getElementById('imageUpgradeButton');
    const imageUpgrade2Button = document.getElementById('imageUpgrade2Button');
    const imageUpgrade3Button = document.getElementById('imageUpgrade3Button');
    const bigCanUpgradeButton = document.getElementById('bigCanUpgradeButton');
    const bouncingIrnBruButton = document.getElementById('bouncingIrnBruButton');
    const doublePointsButton = document.getElementById('doublePointsButton');
    const reduceAutoclickerIntervalButton = document.getElementById('reduceAutoclickerIntervalButton');
    const spawnExtraIrnBruButton = document.getElementById('spawnExtraIrnBruButton');
    const triplePointsButton = document.getElementById('triplePointsButton');
    const instantClickButton = document.getElementById('instantClickButton');
    const reduceBounceSpeedButton = document.getElementById('reduceBounceSpeedButton');
    const increaseBounceSpeedButton = document.getElementById('increaseBounceSpeedButton');
    const spawnGoldenIrnBruButton = document.getElementById('spawnGoldenIrnBruButton');
    const reduceUpgradeCostButton = document.getElementById('reduceUpgradeCostButton');
    const increaseAutoclickerPointsButton = document.getElementById('increaseAutoclickerPointsButton');
    const spawnMegaIrnBruButton = document.getElementById('spawnMegaIrnBruButton');
    const reduceBigCanIntervalButton = document.getElementById('reduceBigCanIntervalButton');
    const unlockSecretUpgradeButton = document.getElementById('unlockSecretUpgradeButton');

    let counter = 0;
    let pointsPerClick = 1;
    let upgradeCost = 10;
    let autoclickerCost = 200;
    let autoclickerActive = false;
    let autoclickerCount = 1; // Number of autoclicks per interval
    let autoclickerUpgradeCost = 200;
    let autoclickerSpeedCost = 300;
    let autoclickerInterval = 5000; // Initial interval in milliseconds
    let autoclickerIntervalId;
    let imageUpgradeCost = 1000; // Updated cost for the first image upgrade
    let imageUpgraded = false;
    let imageUpgrade2Cost = 50000; // Updated cost for the second image upgrade
    let imageUpgrade2Purchased = false;
    let imageUpgrade3Cost = 500000; // Cost for the third bottle upgrade
    let imageUpgrade3Purchased = false;
    let bigCanUpgradeCost = 500;
    let bigCanUpgradePurchased = false;
    let bouncingIrnBruCost = 1500;
    let bouncingIrnBruCount = 0;
    let irnBruImageSrc = "https://github.com/StandiINF/GRAB-Tutorials/blob/main/assets/K1dfun%20clicker/Irn%20bru%201.png?raw=true";
    let leftCan, rightCan; // Declare variables for the big cans
    let doublePointsCost = 5000;
    let reduceAutoclickerIntervalCost = 10000;
    let spawnExtraIrnBruCost = 20000;
    let extraIrnBruCount = 0;
    let triplePointsCost = 10000;
    let instantClickCost = 15000;
    let reduceBounceSpeedCost = 20000;
    let increaseBounceSpeedCost = 25000;
    let spawnGoldenIrnBruCost = 30000;
    let reduceUpgradeCostCost = 35000;
    let increaseAutoclickerPointsCost = 40000;
    let spawnMegaIrnBruCost = 45000;
    let reduceBigCanIntervalCost = 50000;
    let unlockSecretUpgradeCost = 100000;
    let bounceSpeedModifier = 1;

    k1dfun.addEventListener('mousedown', (event) => {
        event.preventDefault();
        k1dfun.classList.add('active');

        counter += pointsPerClick;
        counterElement.textContent = counter;

        const irnBru = document.createElement('img');
        irnBru.src = irnBruImageSrc; // Use the current image source
        irnBru.alt = "IrnBru";
        irnBru.style.position = 'absolute';
        irnBru.style.height = '50px';
        irnBru.style.width = 'auto';

        const randomTop = Math.random() * 90;
        const randomLeft = Math.random() * 90;
        irnBru.style.top = `${randomTop}%`;
        irnBru.style.left = `${randomLeft}%`;

        irnBru.classList.add('fade-in');
        fallingContainer.appendChild(irnBru);

        setTimeout(() => {
            irnBru.classList.remove('fade-in');
            irnBru.classList.add('fade-out');
        }, 1000);

        setTimeout(() => {
            if (fallingContainer.contains(irnBru)) {
                fallingContainer.removeChild(irnBru);
            }
        }, 2000);
    });

    k1dfun.addEventListener('mouseup', () => {
        k1dfun.classList.remove('active');
    });

    k1dfun.addEventListener('mouseleave', () => {
        k1dfun.classList.remove('active');
    });

    // Helper function to handle holding upgrades
    function handleHold(button, action) {
        let intervalId;

        button.addEventListener('mousedown', () => {
            action(); // Trigger the action immediately
            intervalId = setInterval(action, 100); // Repeat every 100ms
        });

        button.addEventListener('mouseup', () => {
            clearInterval(intervalId); // Stop repeating
        });

        button.addEventListener('mouseleave', () => {
            clearInterval(intervalId); // Stop repeating if the mouse leaves the button
        });
    }

    // Upgrade button logic
    handleHold(upgradeButton, () => {
        if (counter >= upgradeCost) {
            counter -= upgradeCost;
            counterElement.textContent = counter;
            pointsPerClick++;
            upgradeCost = Math.floor(upgradeCost * 1.5); // Increase cost
            upgradeButton.textContent = `Upgrade (Cost: ${upgradeCost})`;
        }
    });

    // Autoclicker button logic
    handleHold(autoclickerButton, () => {
        if (counter >= autoclickerUpgradeCost) {
            counter -= autoclickerUpgradeCost;
            counterElement.textContent = counter;

            // Increase autoclicker count
            autoclickerCount++;
            autoclickerUpgradeCost = Math.floor(autoclickerUpgradeCost * 1.5); // Increase cost
            autoclickerButton.textContent = `Autoclicker (Cost: ${autoclickerUpgradeCost})`;

            // Start autoclicking if not already active
            if (!autoclickerActive) {
                autoclickerActive = true;
                autoclickerIntervalId = setInterval(() => {
                    for (let i = 0; i < autoclickerCount + extraIrnBruCount; i++) {
                        counter += 1; // Add 1 point per autoclick
                        counterElement.textContent = counter;

                        // Spawn an irnBru element
                        const irnBru = document.createElement('img');
                        irnBru.src = irnBruImageSrc; // Use the current image source
                        irnBru.alt = "IrnBru";
                        irnBru.style.position = 'absolute';
                        irnBru.style.height = '50px';
                        irnBru.style.width = 'auto';

                        const randomTop = Math.random() * 90;
                        const randomLeft = Math.random() * 90;
                        irnBru.style.top = `${randomTop}%`;
                        irnBru.style.left = `${randomLeft}%`;

                        irnBru.classList.add('fade-in');
                        fallingContainer.appendChild(irnBru);

                        setTimeout(() => {
                            irnBru.classList.remove('fade-in');
                            irnBru.classList.add('fade-out');
                        }, 1000);

                        setTimeout(() => {
                            if (fallingContainer.contains(irnBru)) {
                                fallingContainer.removeChild(irnBru);
                            }
                        }, 2000);
                    }
                }, autoclickerInterval);
            }
        }
    });

    // Autoclicker speed upgrade logic
    handleHold(autoclickerSpeedButton, () => {
        if (counter >= autoclickerSpeedCost && autoclickerInterval > 1000) { // Minimum interval of 1 second
            counter -= autoclickerSpeedCost;
            counterElement.textContent = counter;

            // Reduce interval time
            autoclickerInterval -= 100; // Reduce by 0.1 seconds
            autoclickerSpeedCost = Math.floor(autoclickerSpeedCost * 1.5); // Increase cost
            autoclickerSpeedButton.textContent = `Autoclicker Speed (Cost: ${autoclickerSpeedCost})`;

            // Restart autoclicker with the new interval
            if (autoclickerActive) {
                clearInterval(autoclickerIntervalId);
                autoclickerIntervalId = setInterval(() => {
                    for (let i = 0; i < autoclickerCount + extraIrnBruCount; i++) {
                        counter += 1; // Add 1 point per autoclick
                        counterElement.textContent = counter;

                        // Spawn an irnBru element
                        const irnBru = document.createElement('img');
                        irnBru.src = irnBruImageSrc; // Use the current image source
                        irnBru.alt = "IrnBru";
                        irnBru.style.position = 'absolute';
                        irnBru.style.height = '50px';
                        irnBru.style.width = 'auto';

                        const randomTop = Math.random() * 90;
                        const randomLeft = Math.random() * 90;
                        irnBru.style.top = `${randomTop}%`;
                        irnBru.style.left = `${randomLeft}%`;

                        irnBru.classList.add('fade-in');
                        fallingContainer.appendChild(irnBru);

                        setTimeout(() => {
                            irnBru.classList.remove('fade-in');
                            irnBru.classList.add('fade-out');
                        }, 1000);

                        setTimeout(() => {
                            if (fallingContainer.contains(irnBru)) {
                                fallingContainer.removeChild(irnBru);
                            }
                        }, 2000);
                    }
                }, autoclickerInterval);
            }
        }
    });

    // Image upgrade logic
    handleHold(imageUpgradeButton, () => {
        if (counter >= imageUpgradeCost && !imageUpgraded) {
            counter -= imageUpgradeCost;
            counterElement.textContent = counter;

            // Swap the image and double the points
            imageUpgraded = true;
            pointsPerClick *= 2;

            // Hide the first image upgrade button
            imageUpgradeButton.style.display = "none";

            // Show the second image upgrade button
            imageUpgrade2Button.style.display = "block";

            // Update the image source for new irnBru elements
            irnBruImageSrc = "https://github.com/StandiINF/GRAB-Tutorials/blob/main/assets/K1dfun%20clicker/Irn%20bru%202.jpg?raw=true";

            // Update the big cans if they exist
            if (bigCanUpgradePurchased) {
                leftCan.src = irnBruImageSrc;
                rightCan.src = irnBruImageSrc;
            }
        }
    });

    handleHold(imageUpgrade2Button, () => {
        if (counter >= imageUpgrade2Cost && !imageUpgrade2Purchased) {
            counter -= imageUpgrade2Cost;
            counterElement.textContent = counter;

            // Swap the image and triple the points
            imageUpgrade2Purchased = true;
            pointsPerClick *= 3;

            // Hide the second image upgrade button
            imageUpgrade2Button.style.display = "none";

            // Show the third image upgrade button after the second upgrade is purchased
            imageUpgrade3Button.style.display = "block";

            // Update the image source for new irnBru elements
            irnBruImageSrc = "https://github.com/StandiINF/GRAB-Tutorials/blob/main/assets/K1dfun%20clicker/Irn%20bru%203.png?raw=true";

            // Update the big cans if they exist
            if (bigCanUpgradePurchased) {
                leftCan.src = irnBruImageSrc;
                rightCan.src = irnBruImageSrc;
            }
        }
    });

    handleHold(imageUpgrade3Button, () => {
        if (counter >= imageUpgrade3Cost && !imageUpgrade3Purchased) {
            counter -= imageUpgrade3Cost;
            counterElement.textContent = counter;

            // Swap the image and multiply points by 5
            imageUpgrade3Purchased = true;
            pointsPerClick *= 5;

            // Hide the third image upgrade button
            imageUpgrade3Button.style.display = "none";

            // Update the image source for new irnBru elements
            irnBruImageSrc = "https://raw.githubusercontent.com/StandiINF/GRAB-Tutorials/refs/heads/main/assets/K1dfun%20clicker/Irn%20bru%204.webp";

            // Update the big cans if they exist
            if (bigCanUpgradePurchased) {
                leftCan.src = irnBruImageSrc;
                rightCan.src = irnBruImageSrc;
            }
        }
    });

    handleHold(bigCanUpgradeButton, () => {
        if (counter >= bigCanUpgradeCost && !bigCanUpgradePurchased) {
            counter -= bigCanUpgradeCost;
            counterElement.textContent = counter;

            // Mark the upgrade as purchased
            bigCanUpgradePurchased = true;

            // Hide the upgrade button
            bigCanUpgradeButton.style.display = "none";

            // Create spinning cans
            leftCan = document.createElement('img');
            rightCan = document.createElement('img');

            leftCan.src = irnBruImageSrc; // Use the current image source
            rightCan.src = irnBruImageSrc;

            leftCan.alt = "Big Irn Bru Can";
            rightCan.alt = "Big Irn Bru Can";

            leftCan.className = 'big-can spin-left';
            rightCan.className = 'big-can spin-right';

            // Append cans to the body
            document.body.appendChild(leftCan);
            document.body.appendChild(rightCan);

            // Add points per click every 2.5 seconds
            setInterval(() => {
                counter += pointsPerClick;
                counterElement.textContent = counter;
            }, 2500);
        }
    });

    handleHold(bouncingIrnBruButton, () => {
        if (counter >= bouncingIrnBruCost) {
            counter -= bouncingIrnBruCost;
            counterElement.textContent = counter;

            // Add a new bouncing Irn Bru
            createBouncingIrnBru();
            bouncingIrnBruCount++;

            // Increase the cost for the next upgrade
            bouncingIrnBruCost = Math.floor(bouncingIrnBruCost * 1.5);
            bouncingIrnBruButton.textContent = `Bouncing Irn Bru (Cost: ${bouncingIrnBruCost})`;
        }
    });

    // Double Points Upgrade
    handleHold(doublePointsButton, () => {
        if (counter >= doublePointsCost) {
            counter -= doublePointsCost;
            counterElement.textContent = counter;

            // Double the points per click
            pointsPerClick *= 2;

            // Increase the cost for the next upgrade
            doublePointsCost = Math.floor(doublePointsCost * 2);
            doublePointsButton.textContent = `Double Points (Cost: ${doublePointsCost})`;
        }
    });

    // Reduce Autoclicker Interval Upgrade
    handleHold(reduceAutoclickerIntervalButton, () => {
        if (counter >= reduceAutoclickerIntervalCost && autoclickerInterval > 1000) { // Minimum interval of 1 second
            counter -= reduceAutoclickerIntervalCost;
            counterElement.textContent = counter;

            // Reduce the autoclicker interval
            autoclickerInterval -= 500;

            // Increase the cost for the next upgrade
            reduceAutoclickerIntervalCost = Math.floor(reduceAutoclickerIntervalCost * 1.5);
            reduceAutoclickerIntervalButton.textContent = `Reduce Autoclicker Interval (Cost: ${reduceAutoclickerIntervalCost})`;

            // Restart autoclicker with the new interval
            if (autoclickerActive) {
                clearInterval(autoclickerIntervalId);
                autoclickerIntervalId = setInterval(() => {
                    for (let i = 0; i < autoclickerCount + extraIrnBruCount; i++) {
                        counter += 1; // Add 1 point per autoclick
                        counterElement.textContent = counter;

                        // Spawn an irnBru element
                        const irnBru = document.createElement('img');
                        irnBru.src = irnBruImageSrc; // Use the current image source
                        irnBru.alt = "IrnBru";
                        irnBru.style.position = 'absolute';
                        irnBru.style.height = '50px';
                        irnBru.style.width = 'auto';

                        const randomTop = Math.random() * 90;
                        const randomLeft = Math.random() * 90;
                        irnBru.style.top = `${randomTop}%`;
                        irnBru.style.left = `${randomLeft}%`;

                        irnBru.classList.add('fade-in');
                        fallingContainer.appendChild(irnBru);

                        setTimeout(() => {
                            irnBru.classList.remove('fade-in');
                            irnBru.classList.add('fade-out');
                        }, 1000);

                        setTimeout(() => {
                            if (fallingContainer.contains(irnBru)) {
                                fallingContainer.removeChild(irnBru);
                            }
                        }, 2000);
                    }
                }, autoclickerInterval);
            }
        }
    });

    // Spawn Extra Irn Bru Upgrade
    handleHold(spawnExtraIrnBruButton, () => {
        if (counter >= spawnExtraIrnBruCost) {
            counter -= spawnExtraIrnBruCost;
            counterElement.textContent = counter;

            // Increase the number of extra Irn Brus spawned
            extraIrnBruCount++;

            // Increase the cost for the next upgrade
            spawnExtraIrnBruCost = Math.floor(spawnExtraIrnBruCost * 1.5);
            spawnExtraIrnBruButton.textContent = `Spawn Extra Irn Bru (Cost: ${spawnExtraIrnBruCost})`;
        }
    });

    // Triple Points Upgrade
    handleHold(triplePointsButton, () => {
        if (counter >= triplePointsCost) {
            counter -= triplePointsCost;
            counterElement.textContent = counter;

            // Triple the points per click
            pointsPerClick *= 3;

            // Increase the cost for the next upgrade
            triplePointsCost = Math.floor(triplePointsCost * 2);
            triplePointsButton.textContent = `Triple Points (Cost: ${triplePointsCost})`;
        }
    });

    // Instant Click Upgrade
    handleHold(instantClickButton, () => {
        if (counter >= instantClickCost) {
            counter -= instantClickCost;
            counterElement.textContent = counter;

            // Instantly add points equal to 10x pointsPerClick
            counter += pointsPerClick * 10;
            counterElement.textContent = counter;

            // Increase the cost for the next upgrade
            instantClickCost = Math.floor(instantClickCost * 1.5);
            instantClickButton.textContent = `Instant Click (Cost: ${instantClickCost})`;
        }
    });

    // Reduce Bounce Speed Upgrade
    handleHold(reduceBounceSpeedButton, () => {
        if (counter >= reduceBounceSpeedCost && bounceSpeedModifier > 0.5) {
            counter -= reduceBounceSpeedCost;
            counterElement.textContent = counter;

            // Reduce bounce speed
            bounceSpeedModifier -= 0.1;

            // Increase the cost for the next upgrade
            reduceBounceSpeedCost = Math.floor(reduceBounceSpeedCost * 1.5);
            reduceBounceSpeedButton.textContent = `Reduce Bounce Speed (Cost: ${reduceBounceSpeedCost})`;
        }
    });

    // Increase Bounce Speed Upgrade
    handleHold(increaseBounceSpeedButton, () => {
        if (counter >= increaseBounceSpeedCost) {
            counter -= increaseBounceSpeedCost;
            counterElement.textContent = counter;

            // Increase bounce speed
            bounceSpeedModifier += 0.1;

            // Increase the cost for the next upgrade
            increaseBounceSpeedCost = Math.floor(increaseBounceSpeedCost * 1.5);
            increaseBounceSpeedButton.textContent = `Increase Bounce Speed (Cost: ${increaseBounceSpeedCost})`;
        }
    });

    // Spawn Golden Irn Bru Upgrade
    handleHold(spawnGoldenIrnBruButton, () => {
        if (counter >= spawnGoldenIrnBruCost) {
            counter -= spawnGoldenIrnBruCost;
            counterElement.textContent = counter;

            // Spawn a golden Irn Bru that gives 100x pointsPerClick
            const goldenIrnBru = document.createElement('img');
            goldenIrnBru.src = "https://example.com/golden-irn-bru.png"; // Replace with actual golden Irn Bru image URL
            goldenIrnBru.alt = "Golden Irn Bru";
            goldenIrnBru.style.position = 'absolute';
            goldenIrnBru.style.height = '70px';
            goldenIrnBru.style.width = 'auto';
            goldenIrnBru.style.top = `${Math.random() * 90}%`;
            goldenIrnBru.style.left = `${Math.random() * 90}%`;
            goldenIrnBru.className = 'golden-irn-bru';

            goldenIrnBru.addEventListener('click', () => {
                counter += pointsPerClick * 100;
                counterElement.textContent = counter;
                goldenIrnBru.remove();
            });

            document.body.appendChild(goldenIrnBru);

            // Increase the cost for the next upgrade
            spawnGoldenIrnBruCost = Math.floor(spawnGoldenIrnBruCost * 1.5);
            spawnGoldenIrnBruButton.textContent = `Spawn Golden Irn Bru (Cost: ${spawnGoldenIrnBruCost})`;
        }
    });

    // Reduce Upgrade Costs Upgrade
    handleHold(reduceUpgradeCostButton, () => {
        if (counter >= reduceUpgradeCostCost) {
            counter -= reduceUpgradeCostCost;
            counterElement.textContent = counter;

            // Reduce all upgrade costs by 10%
            upgradeCost = Math.floor(upgradeCost * 0.9);
            autoclickerUpgradeCost = Math.floor(autoclickerUpgradeCost * 0.9);
            autoclickerSpeedCost = Math.floor(autoclickerSpeedCost * 0.9);
            imageUpgradeCost = Math.floor(imageUpgradeCost * 0.9);
            imageUpgrade2Cost = Math.floor(imageUpgrade2Cost * 0.9);
            imageUpgrade3Cost = Math.floor(imageUpgrade3Cost * 0.9);
            bigCanUpgradeCost = Math.floor(bigCanUpgradeCost * 0.9);

            // Increase the cost for the next upgrade
            reduceUpgradeCostCost = Math.floor(reduceUpgradeCostCost * 1.5);
            reduceUpgradeCostButton.textContent = `Reduce Upgrade Costs (Cost: ${reduceUpgradeCostCost})`;
        }
    });

    // Increase Autoclicker Points Upgrade
    handleHold(increaseAutoclickerPointsButton, () => {
        if (counter >= increaseAutoclickerPointsCost) {
            counter -= increaseAutoclickerPointsCost;
            counterElement.textContent = counter;

            // Increase points per autoclick by 2
            autoclickerCount += 2;

            // Increase the cost for the next upgrade
            increaseAutoclickerPointsCost = Math.floor(increaseAutoclickerPointsCost * 1.5);
            increaseAutoclickerPointsButton.textContent = `Increase Autoclicker Points (Cost: ${increaseAutoclickerPointsCost})`;
        }
    });

    // Spawn Mega Irn Bru Upgrade
    handleHold(spawnMegaIrnBruButton, () => {
        if (counter >= spawnMegaIrnBruCost) {
            counter -= spawnMegaIrnBruCost;
            counterElement.textContent = counter;

            // Spawn a mega Irn Bru that gives 500x pointsPerClick
            const megaIrnBru = document.createElement('img');
            megaIrnBru.src = irnBruImageSrc; // Use the current image source
            megaIrnBru.alt = "Mega Irn Bru";
            megaIrnBru.style.position = 'absolute';
            megaIrnBru.style.height = '200px'; // Massive size
            megaIrnBru.style.width = 'auto';
            megaIrnBru.style.top = `${Math.random() * 80}%`; // Adjusted to fit on screen
            megaIrnBru.style.left = `${Math.random() * 80}%`;
            megaIrnBru.className = 'mega-irn-bru';

            megaIrnBru.addEventListener('click', () => {
                counter += pointsPerClick * 500;
                counterElement.textContent = counter;
                megaIrnBru.remove();
            });

            document.body.appendChild(megaIrnBru);

            // Increase the cost for the next upgrade
            spawnMegaIrnBruCost = Math.floor(spawnMegaIrnBruCost * 1.5);
            spawnMegaIrnBruButton.textContent = `Spawn Mega Irn Bru (Cost: ${spawnMegaIrnBruCost})`;
        }
    });

    // Reduce Big Can Interval Upgrade
    handleHold(reduceBigCanIntervalButton, () => {
        if (counter >= reduceBigCanIntervalCost) {
            counter -= reduceBigCanIntervalCost;
            counterElement.textContent = counter;

            // Reduce the interval for big cans to give points
            bigCanInterval = Math.max(1000, bigCanInterval - 500);

            // Increase the cost for the next upgrade
            reduceBigCanIntervalCost = Math.floor(reduceBigCanIntervalCost * 1.5);
            reduceBigCanIntervalButton.textContent = `Reduce Big Can Interval (Cost: ${reduceBigCanIntervalCost})`;
        }
    });

    // Unlock Secret Upgrade
    handleHold(unlockSecretUpgradeButton, () => {
        if (counter >= unlockSecretUpgradeCost) {
            counter -= unlockSecretUpgradeCost;
            counterElement.textContent = counter;

            alert("You unlocked the secret upgrade! Congratulations!");

            // Increase the cost for the next upgrade
            unlockSecretUpgradeCost = Math.floor(unlockSecretUpgradeCost * 2);
            unlockSecretUpgradeButton.textContent = `Unlock Secret Upgrade (Cost: ${unlockSecretUpgradeCost})`;
        }
    });

    // Function to create a bouncing Irn Bru
    function createBouncingIrnBru() {
        const bouncingIrnBru = document.createElement('img');
        bouncingIrnBru.src = irnBruImageSrc; // Use the current image source
        bouncingIrnBru.alt = "Bouncing Irn Bru";
        bouncingIrnBru.className = 'bouncing-irn-bru';

        // Set random initial position
        bouncingIrnBru.style.top = `${Math.random() * 90}%`;
        bouncingIrnBru.style.left = `${Math.random() * 90}%`;

        // Append to the body
        document.body.appendChild(bouncingIrnBru);

        // Animate the bouncing movement
        let dx = (Math.random() * 2 + 1) * bounceSpeedModifier; // Adjust speed by modifier
        let dy = (Math.random() * 2 + 1) * bounceSpeedModifier;

        function move() {
            const rect = bouncingIrnBru.getBoundingClientRect();
            const parentRect = document.body.getBoundingClientRect();

            // Reverse direction and give points if hitting a boundary
            if (rect.left + dx < 0 || rect.right + dx > parentRect.width) {
                dx = -dx;
                counter += pointsPerClick; // Add points for hitting a side
                counterElement.textContent = counter;
            }
            if (rect.top + dy < 0 || rect.bottom + dy > parentRect.height) {
                dy = -dy;
                counter += pointsPerClick; // Add points for hitting a side
                counterElement.textContent = counter;
            }

            // Update position
            bouncingIrnBru.style.left = `${rect.left + dx}px`;
            bouncingIrnBru.style.top = `${rect.top + dy}px`;

            requestAnimationFrame(move);
        }

        move();
    }

    // Add keyboard shortcut for Ctrl+M to give 1 million points
    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key === 'm') {
            counter += 100000000000000000; // Add 1 million points
            counterElement.textContent = counter;
        }
    });
});
