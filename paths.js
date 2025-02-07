export function tri_path() {
    let the_path = new Path2D();
    the_path.moveTo(2, 0);
    the_path.lineTo(0, 5);
    the_path.lineTo(-2, 0);
    the_path.lineTo(-4, -1);
    the_path.lineTo(-2, -2);
    the_path.lineTo(2, -2);
    the_path.lineTo(4, -1);
    the_path.lineTo(2, 0);
    the_path.closePath();
    return the_path;
}

export function U_path(){
    let upath = new Path2D();
    upath.moveTo(-3, -3);
    upath.lineTo(-3, 3);
    upath.lineTo(-1, 3);
    upath.lineTo(-1, -1);
    upath.lineTo(1, -1);
    upath.lineTo(1, 3);
    upath.lineTo(3, 3);
    upath.lineTo(3, -3);
    upath.closePath();
    return upath;
}

export function S_path(){
    let spath = new Path2D();
    spath.moveTo(2, -2.5);
    spath.lineTo(-2, -2.5);
    spath.lineTo(-2, 0.5);
    spath.lineTo(1, 0.5);
    spath.lineTo(1, 1.5);
    spath.lineTo(-2, 1.5);
    spath.lineTo(-2, 2.5);
    spath.lineTo(2, 2.5);
    spath.lineTo(2, -0.5);
    spath.lineTo(-1, -0.5);
    spath.lineTo(-1, -1.5);
    spath.lineTo(2, -1.5);
    spath.lineTo(2, -2.5);
    spath.closePath();
    return spath;
}

export function H_path(){
    let Hpath = new Path2D();
    Hpath.moveTo(2, -2.5);
    Hpath.lineTo(2, 2.5);
    Hpath.lineTo(1,2.5);
    Hpath.lineTo(1, 0.5);
    Hpath.lineTo(-1, 0.5);
    Hpath.lineTo(-1, 2.5);
    Hpath.lineTo(-2, 2.5);
    Hpath.lineTo(-2, 2.5);
    Hpath.lineTo(-2, -2.5);
    Hpath.lineTo(-1, -2.5);
    Hpath.lineTo(-1, -0.5);
    Hpath.lineTo(1, -0.5);
    Hpath.lineTo(1, -2.5);
    Hpath.lineTo(2, -2.5);
    Hpath.closePath();
    return Hpath;
}

export function A_path(){
    let Apath = new Path2D();
    Apath.moveTo(2, -2.5);
    Apath.lineTo(2, 2.5);
    Apath.lineTo(1,2.5);
    Apath.lineTo(1, 0.5);
    Apath.lineTo(-1, 0.5);
    Apath.lineTo(-1, 2.5);
    Apath.lineTo(-2, 2.5);
    Apath.lineTo(-2, 2.5);
    Apath.lineTo(-2, -2.5);
    Apath.lineTo(-1, -2.5);
    Apath.lineTo(-1, -0.5);
    Apath.lineTo(1, -0.5);
    Apath.lineTo(1, -1.5);
    Apath.lineTo(-1,-1.5)
    Apath.lineTo(-1,-2.5)
    Apath.lineTo(2, -2.5);
    Apath.closePath();
    return Apath;
}

export function P_path(){
    let Ppath = new Path2D();
    Ppath.moveTo(0, 0.5);
    Ppath.lineTo(0, 2.5);
    Ppath.lineTo(-1,2.5);
    Ppath.lineTo(-1, -2.5);
    Ppath.lineTo(2, -2.5);
    Ppath.lineTo(2, 0.5);
    Ppath.lineTo(0, 0.5);
    Ppath.lineTo(0, -1.5);
    Ppath.lineTo(1, -1.5);
    Ppath.lineTo(1, -0.5);
    Ppath.lineTo(0, -0.5);
    Ppath.closePath();
    return Ppath;
}

export function E_path(){
    let Epath = new Path2D();
    Epath.moveTo(-2, -2.5);
    Epath.lineTo(2, -2.5);
    Epath.lineTo(2,-1.5);
    Epath.lineTo(-1, -1.5);
    Epath.lineTo(-1, -0.5);
    Epath.lineTo(2, -0.5); //6
    Epath.lineTo(2, 0.5);
    Epath.lineTo(-1, 0.5);
    Epath.lineTo(-1, 1.5);
    Epath.lineTo(2, 1.5);
    Epath.lineTo(2, 2.5);
    Epath.lineTo(-2, 2.5);
    Epath.lineTo(-2, -2.5);
    Epath.closePath();
    return Epath;
}




export function Triangle_path() {
    let Triangle_path = new Path2D();
    Triangle_path.moveTo(-3, 1.5);
    Triangle_path.lineTo(0, -2.5);
    Triangle_path.lineTo(3, 1.5);
    Triangle_path.closePath();
    return Triangle_path;
}

export function Circle_path() {
    let Circle_path = new Path2D();
    const startAngle = 0;
    let endAngle = Math.PI; // End point on circle
    Circle_path.arc(0, 0, 3, startAngle, endAngle, true);
    return Circle_path;
}

export function Square_Path()
{
    let Square_Path = new Path2D();
    Square_Path.moveTo(-3, -2);
    Square_Path.lineTo(3, -2);
    Square_Path.lineTo(3, 2);
    Square_Path.lineTo(-3, 2);

    Square_Path.closePath();
    return Square_Path;
}

export function drawPathFunc(ctx, path, scale) {
    return (x, y, angle, color) => {
        ctx.fillStyle = color;
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.scale(scale, scale);
        
        let m = ctx.getTransform();
        ctx.fill(path, 'evenodd');
        //ctx.stroke(path)
        ctx.resetTransform();
        return m;
    };
}

export function drawButton(ctx, button){
    
    let img = new Image();
    img.src='./images/darkwood.jpg'
    const pattern=ctx.createPattern(img,'repeat')
    ctx.fillStyle=pattern;
    ctx.strokeStyle="black"
    ctx.fillRect(button.x,button.y,button.width,button.height);
    ctx.lineWidth=4;
    ctx.strokeRect(button.x,button.y,button.width,button.height);
    ctx.font = button.font;
    ctx.fillStyle="white";
    ctx.fillText(button.fillText,button.x+20,button.y+70)
    let m=ctx.getTransform();
    return m 
}



const startAngle = 0;
const endAngle = Math.PI * 2;

export function drawRotationRing(ctx,x,y,scale)
{
    ctx.lineWidth = 0.1;
    ctx.strokeStyle="black"
    let path = new Path2D();
    const startAngle = 0;
    let endAngle = Math.PI*2; // End point on circle
    path.arc(0, 0, 3, startAngle, endAngle, true);
    ctx.translate(x, y);
    ctx.scale(20, 20);
    let m = ctx.getTransform();
    ctx.stroke(path);
    ctx.resetTransform();
}

export function LOGO(ctx,x,y, scale){
    let width=300*scale
    let height=200*scale
    let img = new Image();
    img.src='./images/LOGO.png';
    ctx.drawImage(img,x,y,width,height);
}

export function drawhole(ctx, hx,hy,path, scale){
    ctx.fillStyle = "SaddleBrown";
    ctx.translate(hx, hy);
    ctx.scale(scale, scale);
    ctx.fill(path, 'evenodd');
    ctx.resetTransform();
}

export function distance(x1, y1, x2, y2) {
    let dx = x1 - x2;
    let dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}


