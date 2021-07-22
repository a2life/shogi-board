// kifu parser class
import {ShogiKit} from "./defaults";
const mightyPattern = {"10":"＋\s","1":"[１一]",  "2":"[二２]","3":"[三３]","4":"[四４]",
    "5":"[五５]","6":"[六６]","7":"[七７]","8":"[八８]","9":"[九９]","p":"歩","P":"と",
    'L':"成香","l":"香",'N':'成桂','n':'桂','S':'成銀','s':'銀','r':'飛',"R":'[竜龍]',
    "b":'角',"B":'馬',"k":"[玉王]","g":"金","00":"同　","d":"打","J":"\+","+":"成","x":"(投了|中断)"};

export class KifuParser {
    kifu:string

    constructor(kifu:string) {
        this.kifu=kifu
    }
    getMoves(){

    }
    getSenteOnHand(){

    }
    getGoteOnHand(){

    }
    getSenteOnBoard(){

    }
    getGoteOnBoard(){

    }
    parse(){
        return 'parsed  shogiKit'+this.kifu
    }
}

/*


PHP parser for reference
<?php
/**
 * Created by JetBrains PhpStorm.
 * User: A2life
 * UpDate: 7/15/2013
 * added "goteban" handling
 * Time: 2:17 PM
 * To change this template use File | Settings | File Templates.
 * Class kifu
 * __constructor() =  get kifu
 * will define...
 * getMoves()
 * getsOnHand()
 * getgOnHand
 * getsOnboard()
 * getgOnboard()
 * getFlip()

 @var $modx modX

class kifu
{
    private $moves, $sOnHand, $gOnHand,$senteName,$goteName,$teai,$startDate,$endDate,$boardFlip,
    $sOnBoard,
    $gOnBoard,
    $goteban,
    $mightyPattern = array("10"=>"＋\s","1"=>"[１一]",  "2"=>"[二２]","3"=>"[三３]","4"=>"[四４]",
    "5"=>"[五５]","6"=>"[六６]","7"=>"[七７]","8"=>"[八８]","9"=>"[九９]","p"=>"歩","P"=>"と",
    'L'=>"成香","l"=>"香",'N'=>'成桂','n'=>'桂','S'=>'成銀','s'=>'銀','r'=>'飛',"R"=>'[竜龍]',
    "b"=>'角',"B"=>'馬',"k"=>"[玉王]","g"=>"金","00"=>"同　","d"=>"打","J"=>"\+","+"=>"成","x"=>"(投了|中断)");

    private function
    findline($mbstring,$array){
        $c=count($array);
        $f=false;
        for ($i=0;!$f && $i<$c;$i++){
            mb_ereg_search_init($array[$i],$mbstring);
            $f=mb_ereg_search();
        }
        if ($i<$c)  return --$i;
        else return $f;
    }
    private
    function parseRepeat($onHand){
    $regs=array();
    $hands="";
    $pattern="([plnsgrb])(\d*)";
    mb_ereg_search_init($onHand,$pattern);
    while (mb_ereg_search()){
        $regs=mb_ereg_search_getregs();
        $hands.=($regs[2]?str_repeat($regs[1],$regs[2]):$regs[1]);//if more than one, pieces are multiplied here.
    }
    $regs=str_split($hands);
    $onHand=implode(",",$regs);
    return $onHand;
}
    private function parsedata($init_data){

    $xarrays=$this->mightyPattern;
    $boardMarker="９ ８ ７ ６ ５ ４ ３ ２ １";
    $senteOnHandPattern="\n先手の持駒：([^\n]*)[\r\n$]";
    $shimoteOnHandPattern="\n下手の持駒：([^\n]*)[\r\n$]";
    $goteOnHandPattern= "\n後手の持駒：([^\n]*)[\r\n$]";
    $uwateOnHandPattern= "\n上手の持駒：([^\n]*)[\r\n$]";
    $startDatePattern="\n開始日時：([^\n]*)[\r\n$]";
    $endDatePattern="\n終了日時：([^\n]*)[\r\n$]";
    $teaiPattern="\n手合割：([^\n]*)[\r\n$]";
    $senteNamePattern="先手：([^\n]*)[\r\n$]";
    $shimoteNamePattern="下手：([^\n]*)[\r\n$]";
    $goteNamePattern="後手：([^\n]*)[\r\n$]";
    $uwateNamePattern="上手：([^\n]*)[\r\n$]";
    $boardFlipPattern=".*盤面回転";
    $gotebanPattern =".*後手番";
    $senteOnHand=null;
    $goteOnHand=null;
    $onHands=array();
    if(mb_ereg($senteOnHandPattern,$init_data,$onHands)!=false)$senteOnHand=trim($onHands[1]);
    elseif(mb_ereg($shimoteOnHandPattern,$init_data,$onHands)!=false)$senteOnHand=trim($onHands[1]);
    if(mb_ereg($goteOnHandPattern,$init_data,$onHands)!=false)$goteOnHand=trim($onHands[1]);
    elseif(mb_ereg($uwateOnHandPattern,$init_data,$onHands)!=false)$goteOnHand=trim($onHands[1]);
    if(mb_ereg($startDatePattern,$init_data,$onHands)!=false) $startDate=$onHands[1];
    if(mb_ereg($endDatePattern,$init_data,$onHands)!=false) $endDate=$onHands[1];
    if(mb_ereg($teaiPattern,$init_data,$onHands)!=false)$teai=$onHands[1];
    if(mb_ereg($senteNamePattern,$init_data,$onHands)!=false)$senteName=$onHands[1];
    elseif(mb_ereg($shimoteNamePattern,$init_data,$onHands)!=false)$senteName=$onHands[1];
    if(mb_ereg($goteNamePattern,$init_data,$onHands)!=false )$goteName=$onHands[1];
    elseif(mb_ereg($uwateNamePattern,$init_data,$onHands)!=false )$goteName=$onHands[1];
    $boardFlipped = mb_ereg_match($boardFlipPattern,$init_data);
    $this->goteban =mb_ereg_match($gotebanPattern,$init_data)?1:0;
    $init_array=explode("\n",$init_data);
    $i= $this->findline($boardMarker,$init_array);
    if ($i!==false){ //the string contains board chart

        $i=$i+2;  //starting row of 局面　info
        $j=$i+9;  //ending row of 局面　info
      // the following code printed out the board layout for debugging purpose
        for ($n=$i;$n<$j;$n++){
            $m= mb_strlen($init_array[$n]);
            for($k=0;$k<$m;$k++){
                echo "($k):".mb_substr($init_array[$n],$k,1)."|";
            }
            echo "\n";
        }
//
        $senteOnBoard=""; $goteOnBoard="";
        for ($row=$i;$row<$j;$row++){
            //$columnLength=mb_strlen($init_array[$row]);
            for ($k=2;$k<19;$k=$k+2){
                $masu=mb_substr($init_array[$row],$k,1);
                if ($masu!="・"){
                    $colRow=(10-$k/2).($row-$i+1);
                    $side=mb_substr($init_array[$row],$k-1,1);

                    switch($side){
                        case " "://This is Sente's piece
                            $senteOnBoard.=$colRow;
                            $senteOnBoard.=$masu;
                            $senteOnBoard.=" ";
                            break;
                        case "v"://this is Gote's piece
                            $goteOnBoard.=$colRow;
                            $goteOnBoard.=$masu;
                            $goteOnBoard.=" "
                            ;break;
                    }
                }
            }
        }

        $senteOnBoard=trim($senteOnBoard);
        $goteOnBoard=trim($goteOnBoard);
        foreach ($xarrays as $key=>$pat){
            $senteOnBoard=mb_ereg_replace($pat,$key,$senteOnBoard);
            $goteOnBoard=mb_ereg_replace($pat,$key,$goteOnBoard);
            $senteOnHand=mb_ereg_replace($pat,$key,$senteOnHand);
            $goteOnHand =mb_ereg_replace($pat,$key,$goteOnHand);
        }

//spell out pieces and not numbers. ie., s3 -> s,s,s
        $senteOnHand = $this->parseRepeat($senteOnHand);
        $goteOnHand = $this->parseRepeat($goteOnHand);
        //format onboard string
        $senteOnBoard=mb_ereg_replace(" ",",",$senteOnBoard);
        $goteOnBoard=mb_ereg_replace(" ",",",$goteOnBoard);

    }
    if (isset($senteOnBoard)) $this->sOnBoard = $senteOnBoard;
    if (isset($goteOnBoard)) $this->gOnBoard = $goteOnBoard;
    if (isset($senteName)) $this->senteName = $senteName;
    if (isset($goteName)) $this->goteName = $goteName;
    if (isset($startDate)) $this->startDate = $startDate;
    if (isset($endDate)) $this->endDate = $endDate;
    if (isset($teai)) $this->teai = $teai;

    $this->boardFlip = $boardFlipped;
    $this->sOnHand = $senteOnHand;
    $this->gOnHand = $goteOnHand;

}
    public function
    __construct($src){
        mb_regex_encoding ("UTF-8"); //prep to handle mb strings
        mb_internal_encoding("UTF-8");//ditto
        $this->parsedata($src);
        $xlationArray=$this->mightyPattern;

        $match=array();
//$pattern="(?:(\d+)\s+([\w\s]+)(?:\((\d+)\))?[ /():0-9]*(\+?))";
        $header="手数----指手";
        $pattern='(?:(\d+)\s+([\w\s]+)(?:\((\d+)\))?[ /():0-9]*(\+?))|(?:\n(?:\*)([^\n]*))|(?:変化：([\w]+))';
        $parsed="";//
        $movesLines="";
        mb_ereg_search_init($src,$header); // does move exists? if yes, next lines will parse moves
        if (mb_ereg_search()) { //forward to the start of move list
            mb_ereg_search_regs($pattern); //load regs with move parsing $pattern for the first time
            do{
                $match=mb_ereg_search_getregs();
                if ($match[2]){ //
                    $parsed="\n";
                    $parsed.=((($match[1] + $this->goteban) & 1)?"s-":"g-");
                    $parsed.=(trim($match[2]).$match[3].$match[4]."=".$match[1]);

                    foreach($xlationArray as $key=>$pat){
                        $parsed=mb_ereg_replace($pat,$key,$parsed);
                    }
                    $parsed.=(":".trim($match[2]));
                } else if ($match[5]) $parsed="*".trim($match[5])."<br/>";//regex is matching *comment line, the second alternate
            else if ($match[6]) $parsed="\nC:".$match[6];
                else $parsed="\n".$match[0];//regex is matching the last catch all alternate so spit out as is

                $movesLines.=$parsed;
            }
            while(mb_ereg_search_regs());// until next result returns false. note that mb_ereg is caching $string and $pattern


            $movesLines=mb_ereg_replace("J=","J",$movesLines); // replace = with J for jump point
            $movesLines=mb_ereg_replace('(?<=\d\d)[pPlLnNsSgkrRbB](?=.?\d\d)',"",$movesLines); //remove piece info as they are not needed for drawboard
            $movesLines=mb_ereg_replace('-(..)\+','+\1',$movesLines); // s-nn+ => s+nn
            $movesLines=mb_ereg_replace('-(...)d','d\1',$movesLines); // s-68sd => sd68s
            $movesLines=mb_ereg_replace("<br/>\*","<br/>",$movesLines);// process multiple comment lines.
            $movesLines=mb_ereg_replace("<br/>\n","\n",$movesLines);// remove <br> from the end of comment lines.
            $movesLines=trim($movesLines);
            $movesLines.="\nx"; // terminate the end with x to indicate the EOF.
            $moves = explode("\n",$movesLines); // this sequence will
            $movesLines="\"".implode("\",\n\"",$moves)."\""; // surround each line with quotes and ,
            $this->moves = $movesLines;
        }

    }

    public function getMoves()      { return (isset($this->moves)?$this->moves:false); }
    public function getsOnHand()    { return (isset($this->sOnHand)?$this->sOnHand:false);}
    public function getgOnHand()    { return (isset($this->gOnHand)?$this->gOnHand:false);}
    public function getsOnBoard()   { return (isset($this->sOnBoard)?$this->sOnBoard:false);}
    public function getgOnBoard()   { return (isset($this->gOnBoard)?$this->gOnBoard:false);}
    public function getStartDate()  { return (isset($this->startDate)?$this->startDate:false);}
    public function getEndDate()    { return (isset($this->endDate)?$this->endDate:false);}
    public function getSenteName()  { return (isset($this->senteName)?$this->senteName:false);}
    public function getGoteName()   { return (isset($this->goteName)?$this->goteName:false);}
    public function getTeai()       { return (isset($this->teai)?$this->teai:false);}
    public function getFlip()       { return $this->boardFlip;}


}

* */