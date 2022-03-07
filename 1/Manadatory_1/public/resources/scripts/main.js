window.onload = function () {
    try {
        const LED_light = document.getElementsByClassName("LED-light").item(0);
        const LED_s = LED_light.getElementsByTagName("div");
        let even_odd = 0;
        const LED_handler = setInterval(function () {
            try {
                if (even_odd % 2 != 0) {
                    for (let i = 0; i < LED_s.length; i++) {
                        LED_s.item(i).style.animationDelay = `${0.2 * i}s`;
                    }
                } else {
                    for (let i = 0; i < LED_s.length; i++) {
                        LED_s.item(i).style.animationDelay = `${5 * i}ms`;
                    }
                }
                even_odd++;
            } catch (error) {
                console.log("Error at LED lights handler : ", error);
                clearInterval(LED_handler);
            }
        }, 4000);
    } catch (error) { console.log("Error handling LED lights feature : ", error); }
}
