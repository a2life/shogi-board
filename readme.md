# Shogi board using Typescript with viteJS and Preact

### work in progress
## The program reads data input(s) and render shogiboard(s) and mimic piece moves on web page.
#### Displays shogiboard and pieces with Initial arrangement and moves information written in JavaScript literals.
#### This is a rewrite of modx/PHP/JS projects from 2012 using TypeScript (ie., 100% client side solution.) - original project is https://github.com/a2life/Web_shogiboard

June 2021 - ?

State of the coding is 'Alpha release'

to get started, clone repository and then do


<code> npm install </code>

then

<code>npm run dev</code>  to run dev server
 - this will run the project. It is currently configured to show three shogi-boards. First one is a simple three move tsume with forward and back button. click on the board will also advance the move. Right click to move back.
 - Second board shows simple hisshi program. source is in kifu format  and embedded in 'initialSetup' object array.
 - Third board shows piece moves with some branching.
 - Those initial setups are in JavaScript section of index.html,  contained in 'initialSetup' array.
 - more description to come once code development progresses.
 - Behavior and parameters are almost identical to those described in web-shogi-board project from 8 years ago, but still missing features from old project. The project 8 years ago was written with PHP and JavaScript with liberal use of JQuery library functions. This project will be without any JQuery. Modern TypeScript/JavaScript features will be sufficient and finally kifu parser is also written in JavaScript(TypeScript), not that I am avoiding PHP, rather I am much more comfortable with concept of client side processing.
 - The previous project relied on modx CMS as a framework. There will be no restriction on hosting service as long as it supports modern JavaScript.


<code>npm run build </code> to build project

<code>npm run serve </code> to server built project

### todos
<ol>
<li>'Save' button for downloading kif</li>
<li>Tweak display to show 'Sente' and 'Gote' names</li>
 <li>Initial Move count to start showing the board in the middle of the game</li>
<li>Handycap setup</li>
<li>Find area to display players' names</li>
</ol>



## Guide

This is a TypeScript / Preact  project with vitejs as a bundler to display shogiboard on webpages. 
Intended usage is to display shogiboard for explaining shogi piece movement and stragety.

This application is not intended to be used to play shogi. The purpose of this application is to display recorded Shogi movements.
<ol>
<li>Shows static board to demonstrate piece placement on the board </li>
<li>demonstrate  tactical movement of pieces, such as creating castle or prepare for attack</li>
<li>replay games from kifu record that is available from Shogi kifu database.</li>
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

### Preparing the board
board rendering mechanism is basically a couple of js module.
- index.js
- vendor.js

Those javascript files will be served from /assets folder

to create a board, place div element with board-app class, like so

    <div class='board-app'></div>

Then attach the Javascript snippet with the array object with name 'initialSetup'

    <script> const initialSetup=[
    { ...object literal...}
      ]
    </script>

You may add multiple object literal in the initialSetup array. Just add matching number of divs with board-app class name.

Below example shows the two object literals with data to display on the board


    {
    senteOnBoard: "53s,16b",
    goteOnBoard: "41s,51k,61s",
    senteOnHand: 's1',
    goteOnHand: 'r2,p3,l1,g1',
    moves: '*Juicy initial comment,s+5216*Spirit of this problem!,g-5261,sd62s*The rest is easy,x',
    caption: "Three move tsume with extra pieces in gote on-hand area"
    },
    {
    initialComment: 'Hisshi　Problem',
    kifu:`#KIF version=2.0 encoding=UTF-8
    # ---- Kifu for Windows V7 V7.06 棋譜ファイル ----
    開始日時：2015/03/27 21:40:49
    終了日時：2015/03/27 21:41:16
    手合割：平手
    後手の持駒：飛二　角二　金三　銀三　桂四　香三　歩十五
    ９ ８ ７ ６ ５ ４ ３ ２ １
    +---------------------------+
    | ・ ・ ・ ・ ・ ・ ・ ・v香|一
    | ・ ・ ・ ・ ・ ・ と ・v玉|二
    | ・ ・ ・ ・ ・ ・ ・v歩 ・|三
    | ・ ・ ・ ・ ・ ・ ・ ・v歩|四
    | ・ ・ ・ ・ ・ ・ ・ ・ ・|五
    | ・ ・ ・ ・ ・ ・ ・ ・ ・|六
    | ・ ・ ・ ・ ・ ・ ・ ・ ・|七
    | ・ ・ ・ ・ ・ ・ ・ ・ ・|八
    | ・ ・ ・ ・ ・ ・ ・ ・ ・|九
    +---------------------------+
    先手の持駒：金　銀
    先手：攻め方
    後手：受け方
    手数----指手---------消費時間--
    1 ２二銀打     ( 0:05/00:00:05)
    2 ２一桂打     ( 0:06/00:00:06)
    3 １三金打     ( 0:03/00:00:08)
    4 同　桂(21)   ( 0:03/00:00:09)
    5 ２一銀(22)   ( 0:03/00:00:11)
    6 投了         ( 0:07/00:00:16)
    まで5手で先手の勝ち`
    }


parameters--
-  mysteryMoves : (Currently Not implemented) When branch moves exists, then a dropdown list will be displayed at the branch point. It usually shows the default move.  if this parameter is set to 1, then the first selection shows "Select" and not actual move.
- sOnHand : string indicating on hand pieces for sente. default is none. ex. "l,l,p" (see below)
- gOnHand : string indicating on hand pieces for gote. default is none ex. "l,l,p" (see below)
- sOnBoard: string indicating on board pieces for sente. default is initial setup for sente for no handicap game. ex. "11l,21n,31s,41g,51k,13p,22b"
- gOnBoard: string indicating on board pieces for sente. default is initial setup for gote for no handicap game. ex. "99l,28r"
 -markerAt: (currently not implemented) string Indicating the grid that is highlighted. default is "out of the way", ex., "24" for position ２四
- moves : data representing piece moves. ex. "s-2627","g-8687","s-2526","g-8586" (this represents ２六歩、８四歩、２五歩、８五歩).
- kifu: The program can read kakinoki style kifu notation. If this string is provided, it will take precedence over other individual parameters (such as move)
- Currently the parser does not support handicap games.
- startAt or tesuu:  (Currently Not implemented) those two are the same. the board will advance its move to asigned move number. Allows board to start from middle of the game.

Moves, along with *onHand and *onBoard parameter can be used to do quick construction of shogiboard without the use of kifu source 

Moves do not need to alternate between hands. Usually the notation goes like below.

          s-xxxx,g-xxxx,s-xxxx,g-xxxx

but

          s-xxxx,s-xxxx,s-xxxx,g-xxxx

is also allowed. it will be handy for teaching how to construct a castle.

Branching is supported. Branch moves will be shown in front of button bar if the selections are available.

Piece represntations in moves, sOnHand,gOnHand,sOnBoard and gOnBoard parameters are as follows.

    l : lance
    L : lance promoted
    n : Knight
    N : Knight promoted
    s : silver
    S : silver promoted
    r : Rook
    R : Rook promoted
    b : Bishop
    B : Bishop promoted
    k : King

Move notation

Anything after '*' is considered as a comment and will be displayed in comment window.

kifstr is 5 or 6 character string.

first character  ; Either s or g to notate the Side   s = sente(black) and g = gote (white) Note in shogi, the black moves first

second character :  '-' to indicate normal move, '+' to indicate promotion, 'd'  to indicate drop

third and fourth chars:  'move to" coordinate.  34 means 3d, 22 means 2b etc.,

fith and six column : 'move from' coordinate for '-' and '+'. in case of 'd' then only fifthcolumn will be used as piece indicator

example of move

     "s-7677",  : white move a piece from 77 to 76
     "g-3433",  : black moves a piece from 33 to 34
     "sd55g",   : black drops a gold to 5e.
     "g-3534*do you think this is cool?", : white moves a piece from 34 to 35. Comment windows displays"do you think this is cool?"
     s+2228  : piece at the 28 position is moved to 22 and then get promoted.
     "x"   : end of moves indicator

"x" by itself is a special character and denote end of moves.

Branch is supported in the following way. (Use array of string rather than string. The app accepts both format)

    "kifst=1",  //fisrt move 1
    "kifstr=2",// move 2
    "kifstrJ3",// move 3 etc.,
    "kifstrJ4:labelA1", // move 4. move 4 has branch. label should be assigned to the line to indicate its play.(ie., ３七銀etc.,
    "kifstr=5:labelB1", // move 5
    "x",
    "C:4", // indicates branch move at 4th move.
    "kifstr=4:labelB2", // and labelB2 is stuffed into the selectin list.
    "kifstr=5",
    "x",
    "C:3",
    "kifstr=3:LabelA2",
    "kifstr=4",
    "kifstr=5",
    "kifstr=6",
    "kifstr=7",
    "x"

In the above example, when move reaches the third move (J3), list box will be created and the user is presented with a choice with labelA1 and Label A2. If he choses label A1, then make a move, the user will then presented with the list box with choise of LabelB1 and Label B2.

This manual method will quickly become old. 
Therefore, a most likely scenario is to create kifu file using application 
such as Kifu for windows and create Kifu file, then assign the output to
kifu=`` variable. 

Storing of  this kifu file can be statically embedded in javascript file
like this demo but of course those Kifu files can be stored in the 
web server and then have server side script 
(PHP based, NodeJs based, etc.,) to create a initialSetup object and
serve from the server.




