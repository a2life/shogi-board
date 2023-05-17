# Shogi board using Typescript with viteJS and Preact

## The program reads data input(s) and render shogi board(s) and mimic piece moves on web page.
#### Displays shogi board and pieces with Initial arrangement and moves information that is written in JavaScript literals.
#### This is a rewrite of modx/PHP/JS projects from 2012. This new project is written with TypeScript with Preact (In another word, 100% client side solution.) - original PHP/JS/JQuery project is https://github.com/a2life/Web_shogiboard

Initial development period: June 2021 - August 2021
First Deployed in production site -   March 2023


A demo running in website can be seen  <a href='https://shogishack.net/annex/js-shogi-board.html'>in this link </a>.

To get started, clone repository and then do


<code> npm install </code>

then

<code>npm run dev</code>  to run dev server
 - This will run the project with demo page on local server. It is currently configured to show multiple shogi-boards with different configuration. 
 - Data to render those boards are in JavaScript section of index.html,  contained in object array with globally declared variable name of 'initialSetup_ts81'.
 - Behavior and parameters are almost identical to those described in web-shogi-board project from 8 years ago, but missing file fetching option. The project 8 years ago was written with PHP and JavaScript with liberal use of JQuery library functions. This project will be without any JQuery. Modern TypeScript/JavaScript features will be sufficient and finally kifu parser is also written in JavaScript(TypeScript), not that I am avoiding PHP, rather I am much more comfortable with concept of client side processing.
 - The previous project relied on modx CMS as a framework. This new setup does not rely on specific CMS. Only thing required will be for the hosting side to provide shogi data in Javascript array.


<code>npm run build </code> to build project with example index.html

<code>npm run serve </code> to server built project

### todos
- To add file parameter to fetch kifu file. The current setup requires shogi data is already available in loaded javascript object array.
Javascript to request file upload then render it after the data receipt is a different animal.This will introduce async operation and I currently have
zero use case for this scenario,  so just maybe.
- BookMarking:  Kif format document specifies & as 'bookmark' token. I have not seen this used in any kifu that I have encountered but this will be very useful to bookmark any points in branched move. current 'startAt' parameter will only work in main branch position.

## Guide

This is a TypeScript / Preact  project with ViteJs as a bundler to display shogi board on webpages. 
Intended usage is to display shogi board for explaining game of shogi piece movement and strategy.

This application is not intended to be used to play shogi. The purpose of this application is to display recorded Shogi movements.
<ol>
<li>Shows static board to demonstrate piece placement on the board </li>
<li>demonstrate  tactical movement of pieces, such as creating castle or prepare for attack</li>
<li>replay games from kifu record that is available from Shogi kifu database.</li>
</ol>

### Highlight of the project
<ol>
<li>The program can take standard Kakinoki(柿木) style Kifu format as one of Initial setup parameter and parse them into playable shogi board display.</li>
<li>Own instruction set in JavaScript Object format for piece movement and placement. Kifu is first translated to this internal instructions and executed.</li>
<li>Branching is supported</li>
<li>Play forward, backward or jump to branch point with play buttons.  mouse clicking on the board will also move pieces forward or backwards</li>

<li>CSS based board and piece placement. Change CSS to modify board and piece appearance.</li>
<li>Multiple shogi board on single web page.  put placeholder as div element with class name of 'board-app'. If you place two such divs on the page, then the app will render two shogi boards.  You need to provide rendering data array in Javascript. 
</li>
<li>If Kifu is applied, then download icon is available. Clicking on it will download the kifu file as 'download.kif'</li>
</ol>

### Theory of board rendering.
Placement of shogi piece on the board is managed by class attributes of html <img> tag.
For example, to place Sente's king on the 55 location, the following image tag is created and inserted to containing div element 
by the program.

          <img src="[PathToKoma]//sou.png"  class="koma c5 r5" alt="" />
          

The class indicator .c5 and r5 place a piece to relevant location (column 5, row 5) according to css definition.
to move the piece from 55 to 44, the program will manipulate the class so that the tag will be now

          <img src="[PathToKoma]//sou.png"  class="koma c4 r4" alt="" />

the browser will reposition the piece. This gives the illusion that the piece has "moved"

buttonBar block is dynamically created if "moves" exists. 

### Preparing the board
board rendering mechanism is basically a couple of js module.
- index.js
- vendor.js

Those javascript files will be served from /assets folder

to create a board, place div element with board-app class, like so

    <div class='board-app'></div>

This will show shogi board with 'normal' size.

    <div class='board-app large'></div>

This will show shogi board with 'large' size.

Then attach the Javascript snippet with the array object with name 'initialSetup__ts81'.

This variable name 'initialSetup_ts81'is hard coded in index.js as declared global variable. this array need to be stuffed with Shogi data

 

    <script>
        const initialSetup__ts81=[
            { ...object literal...}
      ]
    </script>
    


You may add multiple object literal in the initialSetup__ts81 array. Just add matching number of divs with board-app class name.

Below example shows the two object literals with data to display on the board


    [{
    senteOnBoard: "53s,16b",
    goteOnBoard: "41s,51k,61s",
    senteOnHand: 's1',
    goteOnHand: 'r2,p3,l1,g1',
    moves: [
        "***Juicy initial comment***",
        "s+5216***Spirit of this problem!***",
        "g-5261",
        "sd62s***The rest is easy***",
        "x"
        ],
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
    }]
    
Inside the program, the second object, which main part is a kifu file literal, will be 'pre-processed' to create object literals comparable to the first object. In the project 8 years ago, this 'pre-processing' was done in the PHP server side script.  In this implementation, 'pre-processing' is done on the client side JavaScript (in your browser)


parameters--

- sOnHand or senteOnHand : string indicating on hand pieces for sente. default is none. ex. "l,l,p" (see below)
- gOnHand or goteOnHand: string indicating on hand pieces for gote. default is none ex. "l,l,p" (see below)
- sOnBoard or senteOnBoard: string indicating on board pieces for sente. default is initial setup for sente for no handicap game. ex. "11l,21n,31s,41g,51k,13p,22b"
- gOnBoard or goteOnBoard: string indicating on board pieces for sente. default is initial setup for gote for no handicap game. ex. "99l,28r"
- showMarker:boolean When set to true, it turns on marker indicator to show the last move. When markerAt is set, showMarker will be automatically set to true.
- markerAt: string Indicating the initial grid position that will be highlighted. default is 00 position which is "out of the way".  ex., "24" for position ２四 for the initial display. Afterward, showMarker behavior takes over. If this parameter exists, then ShowMarker flag will be also set to true.
- moves : string[], data representing piece moves. ex. ["s-2627","g-8687","s-2526","g-8586"] 
(this represents ２六歩、８四歩、２五歩、８五歩).
- kifu: The program can read kakinoki(柿木) style kifu notation. Append entire kifu record inside backtick pair (quoted literal) . it will take precedence over other individual parameters (moves, sOnHand,gOnHand,gOnBoard,sOnBoard)
- startup and tesuu: number  Those two are the same. the board will advance its move to assigned move number. Allows board to start from middle of the game record. if both are defined, then 'startAt' takes precedence.
- animate or smooth: boolean Set to false by default. pieces will glide rather than abruptly jump.
- maskBranch :boolean default is false.  When branch moves exists, then a dropdown list will be displayed at the branch
    point. It usually shows the default move.  if this parameter is set to true, then the selection window shows
    "Next Move" and forces user to select move. Also, the select option order is randomized. when "next move" is displayed in the option window, forward button and tap
    forward are disabled.
- maskBranchOnce : boolean, default is false. Similar to maskBranch but it does mask branch window only once. subsequent or replayed branch will not be masked.
- If more controlled branch masking is desired, you can add '?' as a first character of comment line. First branching moves after the comment will be masked. See below.
- flip: boolean default to false when set to true,  Rotate board 180 degree. 
- grid: number. default is 1. Corresponds to different graphics for grid.
- ban: number  default is 2. Corresponds to different graphics for ShogiBoard
- koma: number default is 5. Corresponds to different graphics for koma.
- marker: number default is 1. Corresponds to different color for marker.
- See SetImageSelection.ts for options available for grid,ban,koma and marker.
- Moves, along with onHand and onBoard parameter can be used to do quick construction of shogi board without the use of kifu source 

Moves do not need to alternate between hands. Usually the notation goes like below.

          ["s-xxxx","g-xxxx","s-xxxx","g-xxxx"]

but

          ["s-xxxx","s-xxxx","s-xxxx","g-xxxx"]

is also allowed. it will be handy for teaching how to construct a castle.

Branching is supported. Branch moves will be shown in front of button bar if the selections are available.

Piece representations in moves, sOnHand,gOnHand,sOnBoard and gOnBoard parameters are as follows.

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

Anything after three asterisks and before three asterisks is considered as a comment paragraph and will be displayed in comment window.

If the first character of the comment is '?' or whole comment is just '?' (surrounded by three asterisks) this will affect 
the first branching dropdown list after the comment and option window
will show "Next move" instead of default move. Next move must be selected from dropdown list. Order of selection list will be randomized. 

kifstr is 5 or 6 character string.

first character  ; Either s or g to notate the Side   s = sente(black) and g = gote (white) Note in shogi, the black moves first

second character :  '-' to indicate normal move, '+' to indicate promotion, 'd'  to indicate drop

third and fourth chars:  'move to' coordinate.  34 means 3d, 22 means 2b etc.,

fifth and six column : 'move from' coordinate for '-' and '+'. in case of 'd' then only fifth column will be used as piece indicator

some example of moves

    [
     "s-7677",  // white move a piece from 77 to 76
     "g-3433",  // black moves a piece from 33 to 34
     "sd55g",   // black drops a gold to 5e.
     "g-3534***do you think this is cool?******words after carriage return***", // white moves a piece from 34 to 35. Comment windows displays"do you think this is cool?<cr>words after carriage return"
     s+2228  // piece at the 28 position is moved to 22 and then get promoted.
     "x"   // end of moves indicator
    ]

"x" by itself is a special character and denotes the end of moves.

Branch is supported in the following way.

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

In the above example, when move reaches the third move (J3),
list box will be created and the user is presented with
a choice with labelA1 and Label A2. If the user chooses label A1,
then make a move, the user will then be presented with the list
box with choices of LabelB1 and Label B2.

This manual method is will quickly become tiresome. 
Therefore, a most likely scenario is to create kifu file using application 
such as Kifu for windows and create Kifu file, then assign the output to
kifu=`` variable. 

Storing of  this kifu file can be statically embedded in
javascript file like this demo but of course 
those Kifu files can be stored in the 
web server and then have server side script 
(PHP based, NodeJs based, etc.,) to create a initialSetup object and
serve from the server.

(note) When supplying the kifu from the server,
kifu will be surrounded by back tick (`) as a string literals in JavaScript. 
Care should be taken to escape each backslash so that string literal
will not process it as a combination of next character and make kifu information not properly parsed.





