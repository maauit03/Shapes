
import { tri_path, drawPathFunc, Circle_path, distance, Triangle_path, Square_Path, U_path, S_path, H_path, A_path, P_path,E_path, drawhole, drawRotationRing, drawButton, LOGO} from './paths.js'


window.onload = function () {

    let canvas = document.getElementById('canvas'); // HTML-Element 
    let ctx = canvas.getContext('2d');
    ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2);

    // Load background image
    const backgroundImage = new Image();
    backgroundImage.src = './images/woodtexture.jpg'

    // Resize the canvas dynamically
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw_all();
    }

    // Redraw when image loads and on window resize
    backgroundImage.onload = () => {
        resizeCanvas(); // Ensure image loads correctly
    };




    // MUSIC FILES
    let music= new Audio();
    music.src='./audiofiles/backgroundmusic.mp3';
    music.volume=0.2
    let btn_sfx = new Audio();
    btn_sfx.src='./audiofiles/noice.mp3'
    let sfxflag=false;

    let Wood_sfx = new Audio();
    Wood_sfx.src ='./audiofiles/WoodSoundFX.mp3' 

    let fontsize=(ctx.canvas.width/10)
    const SAMPLES = 10;
    let Timer;


    let startbutton ={
        x: -150,
        y: 150,
        width:300,
        height:100,
        fillText: "Starten",
        font: '70px Comic Sans MS'
    }

    let resetbutton ={
        x: ctx.canvas.width/2-175,
        y: 700,
        width:350,
        height:100,
        fillText: "Level 1",
        font: '60px Comic Sans MS'
    }

    let continuebutton ={
        x: ctx.canvas.width/2-175,
        y: 900,
        width:350,
        height:100,
        fillText: "Level 2",
        font: '60px Comic Sans MS'
    }

    let snapped_counter=0;
    let CountdownStart;
    let startTime = (new Date()).getTime()/1000;
    let time;                       
    let inGame=false
    let last_touched=0;             

    function Button(ctx, button)
    {

        function isInsideButton(x,y){
            if (x > button.x && x < button.x + button.width && y < button.y + button.height && y > button.y)
            {
                
                StartGame()
                inGame=true
                last_touched=0;
                Wood_sfx.play()

                if(button.fillText=="Level 2")
                {
                    StartGame2()
                }
            }

        }

        function createButton(ctx, button){
            drawButton(ctx,button)
        }

        function StartGame(){
            CountdownStart = new Date().getTime()/1000          //startet Countdown auf Knopfdruck
            Timer = 20                                          //setzt Timer

            shapes=[]   //Formen-Array leeren
            shapes.push(createShape(ctx.canvas.width/2, ctx.canvas.height/5 , 0, Circle_path(), "red", ctx.canvas.width/5, ctx.canvas.height/1.5, 1));                // (x,y,angle,path,color,hole-coordinates, index)
            shapes.push(createShape(ctx.canvas.width/5, ctx.canvas.height/5 , 0, Triangle_path(), "yellow",ctx.canvas.width/2, ctx.canvas.height/1.5, 2));
            shapes.push(createShape(ctx.canvas.width/1.2, ctx.canvas.height/5 , 0, Square_Path(), "green",ctx.canvas.width/1.2, ctx.canvas.height/1.5, 3));

            holes=[]    //Hole-Array leeren
            holes.push(createHoles( Circle_path(), ctx.canvas.width/5, ctx.canvas.height/1.5));                                                                       // (path, hx, hy)        
            holes.push(createHoles( Triangle_path(), ctx.canvas.width/2, ctx.canvas.height/1.5));
            holes.push(createHoles( Square_Path(), ctx.canvas.width/1.2, ctx.canvas.height/1.5));

            draw_all();
        }

        function StartGame2(){
            CountdownStart = new Date().getTime()/1000      
            Timer = 100
            shapes=[]
            shapes.push(createShape(60, 200,Math.random()*Math.PI*2 , S_path(), "cornflowerblue", 50, 500, 1));             
            shapes.push(createShape(600, 300,Math.random()*Math.PI*2, H_path(),  "red",150, 500, 6));
            shapes.push(createShape(500, 200,Math.random()*Math.PI*2, A_path(),  "deeppink",250, 500, 5));
            shapes.push(createShape(160, 200,Math.random()*Math.PI*2, P_path(), "Forestgreen",350, 500, 2));
            shapes.push(createShape(300, 200,Math.random()*Math.PI*2, E_path(), "yellow",450, 500, 3));
            shapes.push(createShape(400, 200,Math.random()*Math.PI*2, Circle_path(),  "purple",700, 700, 4));

            holes=[]
            holes.push(createHoles(S_path(), 50, 500));               
            holes.push(createHoles(H_path(),150, 500));
            holes.push(createHoles(A_path(),250, 500));
            holes.push(createHoles(P_path(),350, 500));
            holes.push(createHoles(E_path(),450, 500));
            holes.push(createHoles(Circle_path(),700, 700));

            draw_all();
        }



        return{
        isInsideButton, createButton
        }
    }


    function createHoles(path, hx, hy)
{
    function draw()
    {    
        let scale = 15
        drawhole(ctx, hx,hy,path, scale)
    }
    return{draw}
}


    function createShape(x, y, alpha, path, c1,hx,hy, index) {
        
        let old_alpha;
        let scale = 15;
        let pipe = [];
        let inside = false;
        let drawfunc = drawPathFunc(ctx, path, scale);
        let matrix;
        let snapped = false;

        
        function draw() {
            if (!isClose()) {
                matrix = drawfunc(x, y, alpha, c1);
                if (last_touched == index) {
                    drawRotationRing(ctx, x, y);
                }
            } else {
                // Smoothly transition position and rotation
                x += (hx - x) * 0.1;  // Move towards the hole gradually
                y += (hy - y) * 0.1;
                alpha *= 0.9;          // Gradually reduce rotation to zero
                
                // Ensure the shape fully snaps when close enough
                if (distance(x, y, hx, hy) < 1 && Math.abs(alpha) < 0.1) {
                    x = hx;
                    y = hy;
                    alpha = 0;
                    snapped = true;
                }
        
                drawfunc(x, y, alpha, c1);
            }
        }
        

        
        function move(identifier, nx, ny) {
            if (ident === identifier && !isSnapped()) 
            {
                pipe.push({ x: nx, y: ny });
                if (pipe.length > SAMPLES) 
                {
                    let { x, y } = pipe.shift();
                }
                x += nx - ox;
                y += ny - oy;
                ox = nx;
                oy = ny;
                last_touched=index

            }
            
        }


        function rotation(tx,ty){

            if(distance(tx,ty, x,y)<100 && distance(tx,ty, x,y)>50 && !isSnapped()&& last_touched==index)
            {
                let new_alpha = Math.atan2(y - ty, x - tx);
                if (old_alpha) alpha += new_alpha - old_alpha;
                old_alpha = new_alpha;
            }


        }


        let ox, oy, ident;
        function isInside(identifier, ix, iy) {
            let localInverse = DOMMatrix.fromMatrix(matrix);                       
            localInverse.invertSelf();
            let localTouchPoint = localInverse.transformPoint(new DOMPoint(ix, iy));
            inside = ctx.isPointInPath(path, localTouchPoint.x, localTouchPoint.y);
            if (inside) 
            {
                ident = identifier;
                ox = ix;
                oy = iy;
                pipe = [];
                return true
            }

        }

        function isClose(){
            let abstand=distance(hx,hy,x,y);
                if(abstand<15 && ( (alpha%(Math.PI*2)<0.2 && alpha%(Math.PI*2) > -0.2)))            //nur snappen wenn der Winkel ein vielfaches von 360°(+ Spielraum) ist und Abstand kleienr als 15
            {
                return true
            }
            else 
            {             
                return false
            }
        
        }

        function isSnapped(){
            return snapped;
        }

        function Reset_flags(){
            snapped = false;
            
        }
        


        function reset() {
            inside = false;
            ident = undefined;
            old_alpha=undefined;
        }
        return {
            draw, reset, isInside, move, 
            isClose, rotation, isSnapped, Reset_flags
        };
    }

    function setCountdown(time, Countdown){

        let diff=time-CountdownStart                                                  
        Countdown=Countdown-diff
        return Countdown

    }

    function getCountdown(){
        return setCountdown(time, Timer);
    }

    

    window.addEventListener('resize', function (event) {
        console.log('resize');
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

    });



    // Store the fingers in an array
    let fingers = [];
    function setFingers(touches) {
        for (let t of touches) {
            fingers[t.identifier] = {
                x: t.pageX,
                y: t.pageY,
            };
        }
    }

    function rmFingers(touches) {
        for (let t of touches) {

            fingers[t.identifier] = undefined

        }
    }

    //TOUCH-EVENTS
    let ix,iy;

    canvas.addEventListener("touchstart", (evt) => {                                   
        evt.preventDefault();

        let now = (new Date()).getTime();
        let delta = now - startTime;
        startTime = now;

        setFingers(evt.changedTouches);
        console.log("touchy")

        if(inGame==false)                                                           //If Game hasn't started yet
        {
            for (let btn of buttons)
            btn.isInsideButton(evt.changedTouches[0].pageX, evt.changedTouches[0].pageY);
        }
        
        else{
        for (let sh of shapes) {
            
            sh.isInside(evt.changedTouches[0].identifier, evt.changedTouches[0].pageX, evt.changedTouches[0].pageY)
            ix = evt.changedTouches[0].pageX
            iy = evt.changedTouches[0].pageY;
        }
    }
    }, true);


    canvas.addEventListener("touchmove", (evt) => {
        evt.preventDefault();
        setFingers(evt.changedTouches);
        for (let sh of shapes) {

            sh.move(evt.changedTouches[0].identifier, evt.changedTouches[0].pageX, evt.changedTouches[0].pageY)
            sh.rotation(evt.changedTouches[0].pageX, evt.changedTouches[0].pageY)
            

        }
    }, true);

    canvas.addEventListener("touchend", (evt) => {
        evt.preventDefault();
        rmFingers(evt.changedTouches);

        for (let sh of shapes) {
            sh.reset();
        }
    }, true);

    // Loss-Screen
    function Loss(){                                                               
        ctx.fillStyle="red";
        ctx.strokeStyle="black"
        ctx.font = `${fontsize}px Comic Sans MS`;
        ctx.fillText("GameOver",-(ctx.canvas.width/100)+100,ctx.canvas.height/2) 
        ctx.strokeText("GameOver",-(ctx.canvas.width/100)+100,ctx.canvas.height/2)
        getCountdown();
        buttons[1].createButton(ctx, resetbutton)
        
        console.log("LOSS") 
        inGame = false;              
    }

    // Win-Screen
    function Win(){                                                                 
        ctx.fillStyle="green";
        ctx.strokeStyle="black"
        ctx.font = `${fontsize}px Comic Sans MS`;
        ctx.fillText("Congratulation",-(ctx.canvas.width/100)+100,ctx.canvas.height/4)  
        ctx.strokeText("Congratulation",-(ctx.canvas.width/100)+100,ctx.canvas.height/4) 
        getCountdown();
        buttons[1].createButton(ctx, resetbutton)
        buttons[2].createButton(ctx, continuebutton)
   


        console.log("WIN")   
        inGame = false;
    }

    function drawTimer(){
        ctx.strokeStyle="brown";
        ctx.fillStyle="green";
        if(Math.round(getCountdown())<6)
        {ctx.fillStyle="red";}
        ctx.font = '50px Comic Sans MS';
        ctx.fillText(`Timer:${Math.round(getCountdown())}`,500,50)    //display Timer
    }   

    // ShapesArray erzeugen
    let shapes = [];
    let holes=[];
    // ButtonsArray erzeugen
    let buttons=[]
    buttons.push(Button(ctx,startbutton))
    buttons.push(Button(ctx,resetbutton))
    buttons.push(Button(ctx,continuebutton))

    // Zeichen-Funktion
    function draw_all() {

        snapped_counter=0        
        music.play();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Draw image
        LOGO(ctx, 0,-30,1)

        for (let hole of holes){
            hole.draw();
        }


        for (let sh of shapes) {
            sh.draw();

            if(sh.isSnapped()){                                                     //check if every Shape is snapped by counting isSnapped==true
            snapped_counter++
            }
    }
        

       
        //get current Time/ passed seconds
        time = new Date().getTime()/1000; 

        if (getCountdown()<=0 && snapped_counter<shapes.length)
        {
        Loss();
        }

        else if (getCountdown()>0 && snapped_counter==shapes.length)
       {
        Win();
       }

        else{     
        drawTimer(time);
        requestAnimationFrame(draw_all);
        }

    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Set initial size
    buttons[0].createButton(ctx, startbutton)                                       // Einmaliger Aufruf des Startshapes
    LOGO(ctx, -0,0,4)

};
