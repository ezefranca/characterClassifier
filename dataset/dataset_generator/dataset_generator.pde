String s1 = "data/";
String s2 = "####.png";
String filename = "";
char upper = 'A';
char lower = 'a';
int number = 0;
float x = 0;
float y = 0;
float size = 0;

void setup() {
  size(64, 64);
}

void draw() {

for (char i = 'A'; i <= 'Z'; i++)
 {
   upper = i;
   background(255);
   x = random(0, 30);
   y = random(45, 64);
   fill(0, 0, 0);
   textSize(y);
   text(i ,x, y);  
   filename = s1 + "upper/" + i + "_" + s2;
   saveFrame(filename);
 }
 
 for (char i = 'a'; i <= 'z'; i++)
 {
   lower = i;
   background(255);
   x = random(0, 30);
   y = random(45, 64);
   fill(0, 0, 0);
   textSize(y);
   text(i ,x, y);  
   filename = s1 + "lower/" + i + "_" + s2;
   filename = filename.toLowerCase();
   saveFrame(filename);
 }
 
  for (int i = 0; i <= 9; i++)
 {
   number = i;
   background(255);
   x = random(0, 30);
   y = random(45, 64);
   fill(0, 0, 0);
   textSize(y);
   text(i ,x, y);  
   filename = s1 + "number/" + i + "_" + s2;
   filename = filename.toLowerCase();
   saveFrame(filename);
 }
 
 if (frameCount >= 1000) {
    exit();
 }
}
