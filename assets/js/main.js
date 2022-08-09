gsap.registerPlugin(ScrollTrigger);

const body = document.body
body.style.overflow = "hidden"

const width = window.innerWidth 
// -(window.innerWidth - document.body.clientWidth)
const height = window.innerHeight

var style = document.createElement('style');
style.type = 'text/css';



//  █████╗  ██████╗ ██████╗██╗   ██╗███████╗██╗██╗     
// ██╔══██╗██╔════╝██╔════╝██║   ██║██╔════╝██║██║     
// ███████║██║     ██║     ██║   ██║█████╗  ██║██║     
// ██╔══██║██║     ██║     ██║   ██║██╔══╝  ██║██║     
// ██║  ██║╚██████╗╚██████╗╚██████╔╝███████╗██║███████╗
// ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝╚══════╝
                                                    


{

    const section_accueil = document.querySelector(".section-accueil")  
    const accueil_content = section_accueil.querySelector(".content")
    const svg = accueil_content.querySelector(".deco")
    let scrollbarWidth = (window.innerWidth - document.body.clientWidth);
    accueil_content.style.transform = "translateX(-"+scrollbarWidth/2+"px)"
    const bordure = section_accueil.querySelectorAll(".bordure")


    ///------------ TRANSITION / LOADER ------------///

    // Loader
    const loader = section_accueil.querySelector(".loader")



    // grid 
    const container = section_accueil.querySelector(".grid-container")
    const rect = [75, 75]
    container.style.width = width + rect[0] - width % rect[0] + "px"

    const total_x = Math.ceil(width / rect[0])
    const total_y = Math.ceil(window.innerHeight / rect[1])
    const total =  total_x * total_y
    let box_array = []


    for(var i = 0; i < total; i++) {
        const box = document.createElement("div")
        box.classList.add("box")
        box.style.width = rect[0]+"px"
        box.style.height = rect[1]+"px"
        box_array.push(box)
        container.appendChild(box)
    }




    ///------------ SVG DECO ------------///



    // SVG Deco First
    const path = svg.querySelectorAll(".first > path")

    for(var i = 0; i < path.length; i++) {
        path[i].style.strokeDasharray = path[i].getTotalLength()
        path[i].style.strokeDashoffset = path[i].getTotalLength()
    }

    // SVG Deco Second
    const lines_left_top = Array.from(svg.querySelectorAll(".second > .left-top > line"))
    const lines_left_bottom = Array.from(svg.querySelectorAll(".second > .left-bottom > line"))
    const lines_right_top = Array.from(svg.querySelectorAll(".second > .right-top > line")).reverse()
    const lines_right_bottom = Array.from(svg.querySelectorAll(".second > .right-bottom > line")).reverse()


    // SVG Deco Third
    const rect_left = svg.querySelectorAll(".third .left")
    const rect_right = svg.querySelectorAll(".third .right")





    ///------------ ANIMATION TITRE ------------///


    const title = document.getElementsByTagName("h1")[0]
    const sub_title = section_accueil.getElementsByTagName("h2")[0]

    title.innerHTML = ""


    const anim_h1 = (elmt, final_string) => {
        let string = ""
        const chart = ["!","-","_","/","=","+","*","^","?","#","_"];
        let n = 0
        let i = 0

        const clock = setInterval(() => { anim_chart() }, 10)

        const anim_chart = () => {
            if(i == final_string.length) {
                clearInterval(clock)
            } 
            else if(final_string[i] == "\n") {
                string += "\n"
                elmt.innerHTML = string
                i++
            } 
            else if(n == chart.length) {
                string += final_string[i]
                elmt.innerHTML = string
                i++
                n = 0
        
            } else {
                elmt.innerHTML = string + chart[n]
                n++
            }  
        }
    } 

    const anim_h2 = (elmt, array) => {
        const chart = ["!","-","_","/","=","+","*","^","?","#","_",""];
        let n = 0
        let i = 0

        let strings = array.map((string) => string[0].split(""))
        let coord = array.map((string) => string[1])
        let string = [...strings[0]]
        
        let max_i = strings.length - 1
        let j = string.length - 1
        let writing = false
        let clock = setInterval(() => { anim_chart() }, 5)

        const anim_chart = () => {
            if(writing) {
                if(n == chart.length) {

                    if(j == strings[i].length) {
                        writing = false
                        clearInterval(clock)
                        setTimeout(() => {clock = setInterval(() => { anim_chart() }, 5)}, 4000)
                        
                    } else {
                        string[j] = strings[i][j]
                        j++
                        n = 0
                    }
                } else {
                    string[j] = chart[n]
                    elmt.innerHTML = string.join("")
                    n++
                }

            } else {
                if(n == chart.length) {
                    if(j == 0) {
                        if( i == max_i) {
                            i = 0
                            
                        } else {
                            i++
                        }
                        elmt.style.left = coord[i]+"px"
                        writing = true
                    }

                    j--
                    n = 0

                } else {
                    string[j] = chart[n]
                    elmt.innerHTML = string.join("")
                    n++
                }
            }
        }
    }


    ///------------ PATH ANIM ------------///

    const path_anim = (arr) => {

        for( let i = 0; i < arr.length; i++) {
            gsap.to(arr[i], {strokeDasharray: (arr[i].getTotalLength()-50), duration: 10})
        }
        let j = 0


        setInterval(() => {

            for( let i = 0; i < arr.length; i++) {
                arr[i].style.strokeDashoffset = j
            }
            j++
        }, 1000/60)
    }


    ///------------ TIMELINE ACCUEIL ------------///

    var tl = gsap.timeline();
    tl.to(loader, {duration: 1, opacity: 0})
    tl.to(box_array, {duration: 1, scale: 0, ease: "power1.inOut", stagger: {grid: "auto", from: "center", amount: 1}}, 1);
    tl.call(anim_h1, [title, "WILLIAM\nMEHAT"],  3)
    tl.to(sub_title, {duration: 1, opacity: 1}, 5)
    tl.to(path, {strokeDashoffset: 0, duration: 3}, 6.5);
    tl.to(lines_left_top, {opacity: 1, x:0, y:0, stagger: 0.2, duration: 0.5}, 7);
    tl.to(lines_left_bottom, {opacity: 1, x:0, y:0, stagger: 0.2, duration: 0.5}, 7);
    tl.to(lines_right_top, {opacity: 1, x:0, y:0, stagger: 0.2, duration: 0.5}, 7);
    tl.to(lines_right_bottom, {opacity: 1, x:0, y:0, stagger: 0.2, duration: 0.5}, 7);
    tl.to(rect_left, {opacity: 1, stagger: 0.5, duration: 1},8.5);
    tl.to(rect_right, {opacity: 1, stagger: 0.5, duration: 1},8.5);
    tl.to(bordure, {opacity: 1, duration: 0}, 11)
    tl.to(body, {overflow: "visible"}, 11)
    tl.to(accueil_content, {x: 0, duration: 0}, 11)
    tl.to(path, {transition: 0, duration: 0}, 11);
    // tl.to(p)
    tl.set(section_accueil, {className:'section-accueil invert'}, 11);
    tl.call(anim_h2, [sub_title, [["Développeur Créatif", 65], ["Creative developer", 75], ["クリエイティブ開発者", 55], ["креативный разработчик", 45]]], 13)
    tl.call(path_anim, [[path[4], path[5]]], 13)
    tl.progress( 1 ); 



    // gsap.to(path[4], {
    //     scrollTrigger: {
    //         trigger: accueil_content,
    //         scrub: true,
    //         start: "center center",
    //         end: "75% center",
    //         markers: true
    //     },
    //     strokeDashoffset: (index) => { return path[index].getTotalLength()},

    // });

}


// ███████╗ ██████╗██████╗  █████╗ ███╗   ██╗    
// ██╔════╝██╔════╝██╔══██╗██╔══██╗████╗  ██║    
// █████╗  ██║     ██████╔╝███████║██╔██╗ ██║    
// ██╔══╝  ██║     ██╔══██╗██╔══██║██║╚██╗██║    
// ███████╗╚██████╗██║  ██║██║  ██║██║ ╚████║    
// ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝    
                                              
{

    const section_ecran = document.querySelector(".section-ecran")  
    const wrap = section_ecran.querySelector(".wrap")


    const bouton = wrap.querySelector(".bouton-hack")
    const svg_bouton = bouton.querySelector("svg")
    const circle_bouton = svg_bouton.querySelector(".circle")
    const p_bouton = bouton.querySelector("p")

    const loader = wrap.querySelector(".loader-hack")
    const svg_loader = loader.querySelector("svg")
    const path_loader = svg_loader.querySelectorAll("path")
    const p_loader = loader.querySelector("p")

    const screen = wrap.querySelector(".screen")
    const bottom_bar = screen.querySelector(".bottom-bar")
    const menu = bottom_bar.querySelector(".menu")
    const screen_x = (width - wrap.offsetWidth) / 2
    const screen_y = (height - wrap.offsetHeight) / 2


    const date = bottom_bar.querySelector(".date")
    let today = new Date();
    date.innerHTML = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();


    const icons = screen.querySelectorAll(".icon")
    const windows = screen.querySelectorAll(".window")
    const tabs = screen.querySelectorAll(".tab")
    let mouse = {}
    let order = []
    let previousActive = ""
    let tabBool = true
    let iconBool = false
    
    
    
    // EXPERIENCES

    {
        const experiences = screen.querySelector(".experiences")
        const rounds = experiences.querySelectorAll(".experience > .round")
        const anim_round = experiences.querySelector(".anim-round")
        for(let i = 0; i < rounds.length; i++) {
            rounds[i].addEventListener("click", (e) => {
                e.path[1].classList.toggle("open")
            })
        }
        let nb = experiences.children.length-1
        let width = 110

        for(let i = 0; i < nb; i++) {
            experiences.children[i].style.animation = "0.5s "+i/2+"s forwards scale"
        }

        // nb-1 car le cercle animé est déjà présent sur le premier cercle //

        anim_round.style.animation = "0.5s forwards scale, "+(nb-1)/2+"s ease forwards exp-move, 0s linear "+nb+"s forwards disappear"

        let keyFrames = '\
        @-webkit-keyframes exp-move {\
            100% {\
                -webkit-transform: translateX(A_DYNAMIC_VALUE);\
            }\
        }\
        @-moz-keyframes exp-move {\
            100% {\
                -webkit-transform: translateX(A_DYNAMIC_VALUE);\
            }\
        }';
        style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g, (nb-1)*width+"px");
    }






    const isActive = (i) => {
        tabs[i].classList.add("active")
        if(order.includes(i)) {
            order.splice(order.indexOf(i), 1)
            order.push(i)
        } else {
            order.push(i)
        }
        
        for(let j = 0; j < order.length; j++) {
            windows[order[j]].style.zIndex = j
        }
        previousActive = windows[i]
    }

    screen.addEventListener("mousedown", (e) => {


        for(let i = 0; i < windows.length; i++) {
            windows[i].classList.remove("active")
            tabs[i].classList.remove("active")
            menu.classList.remove("active")
        }
        for(let i = 0; i < e.path.length; i++) {
            if(e.path[i].classList) {
                let elmt = e.path[i]

                if(elmt.classList.contains("window")) {
                    elmt.classList.add("active")
                    isActive(elmt.dataset.window)
                    
                } else if(elmt.classList.contains("icon")) {
                    let targetWindow = windows[elmt.dataset.window]
                    let targetTab = tabs[elmt.dataset.window]
                    iconBool = false

                    if(targetWindow.classList.contains("off")) {
                        targetWindow.classList.replace("off","active")
                        targetTab.classList.remove("off")
                        // if(targetWindow.children[1].children[0].className == "experiences"){

                        // }
                    } else if(targetWindow.classList.contains("reduced")) {
                        targetWindow.classList.replace("reduced","active")
                        iconBool = true
                    } else {
                        targetWindow.classList.add("active")
                    }

                    isActive(elmt.dataset.window)

                } else if (elmt.classList.contains("tab")) {
                    let targetWindow = windows[elmt.dataset.window]

                    if(targetWindow.classList.contains("reduced")) {
                        targetWindow.classList.replace("reduced","active")
                        isActive(elmt.dataset.window)
                    } else if(previousActive !== targetWindow) {
                        targetWindow.classList.add("active")
                        isActive(elmt.dataset.window)
                        tabBool = false
                    } else {
                        targetWindow.classList.add("reduced")
                    }  
                
                } else if (elmt.classList.contains("logo")) {
                        
                    menu.classList.add("active")
                    
                    
                }
            } 
        }



        
    })

    const anim_window = (i, values, appear) => {
        let count
        if(appear) {
            count = 0
            let clock = setInterval(() => {
                count+=10
                windows[i].style.transform = "translate("+values.x+"px, "+values.y+"px) scale("+count/100+")"
                if(count >= 100) {
                    clearInterval(clock)
                }
            }, 20)
        } else {
            count = 100
            let clock = setInterval(() => {
                count-=10
                windows[i].style.transform = "translate("+values.x+"px, "+values.y+"px) scale("+count/100+")"
                if(count <= 0) {
                    clearInterval(clock)
                }
            }, 20)
        }
        

    }

    
    for(let i = 0; i < icons.length; i++) {

        const bar = windows[i].getElementsByClassName("options")[0]
        let current = {}
        let values = {x:0,y:0}
        const close = bar.querySelector(".close")
        const reduce = bar.querySelector(".reduce")

        close.addEventListener("click", () => {
            windows[i].classList.replace("active","off")
            tabs[i].classList.replace("active","off") // MEMO A VOIR APRES //
        })

        reduce.addEventListener("click", () => {
            anim_window(i, values, false)
            windows[i].classList.replace("active","reduced")
            tabs[i].classList.remove("active")

        })

        tabs[i].addEventListener("click", () => {
            if(tabBool){
                if(windows[i].classList.contains("reduced")) {
                    anim_window(i, values, false)
                } else if(windows[i].classList.contains("active")) {
                    anim_window(i, values, true)
                } 
            } else {
                tabBool = true
            }
        })

        icons[i].addEventListener("click", () => {
            if(iconBool) {
                anim_window(i, values, true)
            } else {
                iconBool = false
            }
        })



        bar.addEventListener("mousedown", (event) => {
            mouse.x = event.clientX - screen_x
            mouse.y = event.clientY - screen_y

            // Ceci me permet de déterminer les valeurs actuelles de translate X et Y
            let matrix = new WebKitCSSMatrix(window.getComputedStyle(windows[i]).transform);
            current.x = matrix.m41
            current.y = matrix.m42

            screen.addEventListener("mousemove", window_control);


        })
        bar.addEventListener("mouseup", () => {
            screen.removeEventListener("mousemove", window_control);
        })

        const window_control = (event) => {

            // Cette opération me permet de déterminer combien de pixel la souris a bougé depuis que le clic gauche est actionné
            values.x = current.x + event.clientX - screen_x - mouse.x
            values.y = current.y + event.clientY - screen_y - mouse.y

            // J'additionne les valeurs actuelles de translate et les valeurs des déplacements de ma souris
            windows[i].style.transform = "translate("+values.x+"px, "+values.y+"px)"

        }
    }
    


    
    const anim_p_bouton = (elmt) => {

        const chart = ["!","-","_","/","=","+","*","^","?","#","_"];
        let n = 0
        let i = elmt.innerHTML.length-1
        let str = elmt.innerHTML.split("")

        let clock = setInterval(() => { anim_chart() }, 5)

        const anim_chart = () => {

            if(n == chart.length) {
                if(i == 0) {
                    clearInterval(clock)
                }
                str[i] = ""
                elmt.innerHTML = str.join("")
                i--
                n = 0
            } else {
                str[i] = chart[n]
                elmt.innerHTML = str.join("")
                n++
            }
        }
    }

    const anim_loader = () => {

        let i = 0
        let clock = setInterval(() => { anim_int() }, 20)

        const anim_int = () => {
            if(i == 100) {
                clearInterval(clock)
            }
            p_loader.innerHTML = i+"%"
            i++
           
        }
    }


    
    // bouton.addEventListener("click", () => {
        let tl = gsap.timeline();
        tl.to(svg_bouton, {opacity: 0, rotate: 360, duration: 0.5},0)
        tl.to(circle_bouton, {scale: 10, duration: 0.5},0)
        tl.call(anim_p_bouton, [p_bouton],  0.5)
        tl.to(path_loader, {opacity: 1, stagger: { amount: 2 }}, 1)
        tl.call(anim_loader, {}, 1)
        tl.to(p_loader, {opacity: 1,  duration: 0},1)
        tl.to(path_loader, {opacity: 0, stagger: { amount: 1 }}, 3)
        tl.to(p_loader, {opacity: 0,  duration: 0.5},3.5)
        tl.to(screen, {opacity: 1, display: "flex", duration: 1.5}, 4.5)
        tl.to(bottom_bar, {y: 0, duration:0.5}, 6)
        tl.progress( 1 );     
    // })  


    
}







document.getElementsByTagName('head')[0].appendChild(style);