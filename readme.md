# Shogi board using Typescript with viteJS and Preact

### work in progress
## The program reads data input(s) and render shogiboard(s) and mimic piece moves on web page.
#### Displays shogiboard and pieces with Initial arrangement and moves information written in JavaScript literals.
#### This is a rewrite of modx/PHP/JS projects from 2012 using TypeScript - original project is https://github.com/a2life/Web_shogiboard

June 2021 - ?

<code> npm install </code>

then

<code>npm run dev</code>  to run dev server
 - this will run the project. It is currently configured to show three shogi-boards. First one is a simple three move tsume with forward and back button. click on the board will also advance the move. Right click to move back.
 - Second board shows simple hisshi program. source is in kifu format  and embedded in 'initialSetup' object array.
 - Third board shows piece moves with some branching.
 - Those initial setups are in JavaScript section of index.html,  contained in 'initialSetup' array.
 - more description to come once code development progresses.
 - Behavior and parameters are almost identical to those described in web-shogi-board project from 8 years ago, but still missing features from old project. The project 8 years ago was written with PHP and JavaScript with liberal use of JQuery library functions. This project will be without any JQuery. Modern TypeScript/JavaScript features will be sufficient and finally kifu parser is also written in JavaScript(TypeScript), not that I am avoiding PHP, rather I am much more comfortable with concept of client side processing.


<code>npm run build </code> to build project

<code>npm run serve </code> to server built project

### todos
<ol>
<li>'Save' button for downloading kif</li>
<li>Tweak display to show 'Sente' and 'Gote' names</li>
 <li>Initial Move count to start showing the board in the middle of the game</li>
</ol>



## Guide

This is a TypeScript / Preact  project with vitejs as a bundler to display shogiboard on webpages. 
Intended usage is to display shogiboard for explaining shogi piece movement and stragety.

This application is not intended to be used for actual shogi play application.
<ol>
<li>Shows static board to demonstrate piece placement on the board </li>
<li>demonstrate  tactical movement of pieces, such as creating castle or prepare for attack</li>
<li>replay games from kifu record</li>
</ol>

### Highlight of the project
<ol>
<li>The program will take standard Kakinoki style Kifu format as one of Initial setup parameter and parse them into playable shogiboard display.</li>
<li>Own instruction set in JavaScript Object format for piece movement and placement. Kifu is internally translated to this internal instructions and executed.</li>
<li>Branching is supported</li>
<li>Play forward, backword or jump to branch point with play buttons.  mouse clicking on the board will also move pieces forward or backwards</li>

<li>CSS based board and piece placement.</li>
<li>Multiple shogiboard on single web page</li>
</ol>

### Theory of board rendering.
Plaecement of shogi piece on the board is managed by class atributes of html <img> tag.
For example, to place Sente's king on the 55 location, the following image tag is created and inserted to containing div element 
by the program.

          <img src="[PathToKoma]//sou.png"  class="koma c5 r5" alt="" />
          

The class indicator .c5 and r5 place a piece to relevant location (column 5, row 5) according to css definition.
to move the piece from 55 to 44, the program will manupulate the class so that the tag will be now

          <img src="[PathToKoma]//sou.png"  class="koma c4 r4" alt="" />

the browser will reposition the piece and it gives the illusion that the piece has "moved"

buttonBar block is dynamically created if "moves" exists. 


