function calculateAge() {
    const birthdate = new Date(document.getElementById('birthdate').value);
    const birthtime = document.getElementById('birthtime').value;
    const [birthHour, birthMinute] = birthtime.split(':').map(Number);

    // Set birthdate time if provided
    birthdate.setHours(birthHour || 0, birthMinute || 0, 0);

    // Clear any existing interval
    if (window.ageInterval) clearInterval(window.ageInterval);

    // Update every second
    window.ageInterval = setInterval(() => {
        const now = new Date();

        // Calculate years, months, days, hours, minutes, and seconds for age
        let years = now.getFullYear() - birthdate.getFullYear();
        let months = now.getMonth() - birthdate.getMonth();
        let days = now.getDate() - birthdate.getDate();
        let hours = now.getHours() - birthdate.getHours();
        let minutes = now.getMinutes() - birthdate.getMinutes();
        let seconds = now.getSeconds() - birthdate.getSeconds();

        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months += 12;
        }

        if (days < 0) {
            months--;
            const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += lastMonth.getDate();
        }

        if (hours < 0) {
            days--;
            hours += 24;
        }

        if (minutes < 0) {
            hours--;
            minutes += 60;
        }

        if (seconds < 0) {
            minutes--;
            seconds += 60;
        }

        // Calculate days, weeks, and hours since birth
        const timeSinceBirth = now - birthdate;
        const totalDays = Math.floor(timeSinceBirth / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalHours = Math.floor(timeSinceBirth / (1000 * 60 * 60));

        // Display age and additional information
        document.getElementById('result').innerText = 
            `Your age is ${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`;
        document.getElementById('daysSince').innerText = `Days since birth: ${totalDays}`;
        document.getElementById('weeksSince').innerText = `Weeks since birth: ${totalWeeks}`;
        document.getElementById('hoursSince').innerText = `Hours since birth: ${totalHours}`;

        // Calculate time until next birthday and update every second
        document.getElementById('nextBirthday').innerText = calculateTimeUntilNextBirthday(birthdate, now);
    }, 1000);
}

function calculateTimeUntilNextBirthday(birthdate, now) {
    let nextBirthday = new Date(now.getFullYear(), birthdate.getMonth(), birthdate.getDate(), birthdate.getHours(), birthdate.getMinutes());

    // If the birthday this year has already passed, set for next year
    if (now > nextBirthday) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
    }

    const diff = nextBirthday - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `Time until next birthday: ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`;
}

function resetCalculator() {
    clearInterval(window.ageInterval);
    document.getElementById('birthdate').value = '';
    document.getElementById('birthtime').value = '';
    document.getElementById('result').innerText = '';
    document.getElementById('daysSince').innerText = '';
    document.getElementById('weeksSince').innerText = '';
    document.getElementById('hoursSince').innerText = '';
    document.getElementById('nextBirthday').innerText = '';
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
