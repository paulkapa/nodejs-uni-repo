console.log("Loaded!!!");
window.onload = function () {
    console.log("Loaded!!!");
    const LED_light = document.getElementsByClassName("LED-light").item(0);
    const LED_s = LED_light.getElementsByTagName("div");
    let even_odd = 0;
    const handler = setInterval(function () {
        console.log(even_odd);
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
    }, 4000);
}
