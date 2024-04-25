/**
 * this script is a data provider/construtor for setting up board with 31 tsume problems.
 * html side needs to provide the following element
 * <div class="board-app" data-input="bInput"></div>
 * <button id="prevProblem">
 * <button id="nextProblem">
 * <select id="tsumeset">
 *
 * @type {[{senteOnHand: string, goteOnBoard: string, initialComment: string, moves: string[], caption: string, title: string, senteOnBoard: string},{senteOnHand: string, goteOnBoard: string, moves: string[], caption: string, title: string, senteOnBoard: string},{senteOnHand: string, goteOnBoard: string, moves: string[], caption: string, title: string, senteOnBoard: string},{senteOnHand: string, goteOnBoard: string, moves: string[], caption: string, title: string, senteOnBoard: string},{senteOnHand: string, goteOnBoard: string, moves: string[], caption: string, title: string, senteOnBoard: string},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]}
 */
const tsumeStarters = [
    {
        title: 'Problem 0',
        caption: 'This 3 move tsume is an Essense of Tsume problem ',
        initialComment: `Let's start with this widely known tsume problem`,
        senteOnBoard: '53s,16b',
        goteOnBoard: '41s,51k,61s',
        senteOnHand: `s`,
        moves: ["s+5216", "g-0041", "sd42s", "x"]
    },
    {
        title: 'Problem 1',
        caption: '3 moves mate',
        senteOnBoard: `21r,24p`,
        goteOnBoard: `12k,13p,22s`,
        senteOnHand: `g`,
        moves: ["sd11g", "g-0022", "s+2321", "x"],
    },
    {
        title: 'Problem 2',
        caption: '3 moves mate',
        senteOnBoard: `34n`,
        goteOnBoard: `12k,23s`,
        senteOnHand: `g,r`,
        moves: ["sd11r", "g-0012", "sd22g", "x"],
    },
    {
        title: 'Problem 3',
        caption: '3 moves mate',
        senteOnBoard: `14n,15l`,
        goteOnBoard: `11k,21g`,
        senteOnHand: `b`,
        moves: ["sd33b", "g-1211", "s+2214", "x"],
    },
    {
        title: 'Problem 4',
        caption: '3 moves mate',
        senteOnBoard: `15n,16l`,
        goteOnBoard: `12k,21n,22p`,
        senteOnHand: `r`,
        moves: ["sd11r", "g-0012", "s-2315", "x"],
    },
    {
        title: 'Problem 5',
        caption: '3 moves mate',
        senteOnBoard: `22b,33s`,
        goteOnBoard: `21k`,
        senteOnHand: `s`,
        moves: ["s+3122", "g-0021", "sd32s", "x"],
    },
    {
        title: 'Problem 6',
        caption: '3 moves mate',
        senteOnBoard: `21B,35g`,
        goteOnBoard: `13r,23k`,
        senteOnHand: `s`,
        moves: ["sd34s","g-1423","s-2535","x"],
    },
    {
        title: 'Problem 7',
        caption: '3 moves mate',
        senteOnBoard: `12R,33n`,
        goteOnBoard: `52R,31k`,
        senteOnHand: `b`,
        moves: ["sd42b","g-0052","s-2112","x"],
    },
    {
        title: 'Problem 8',
        caption: '3 moves mate',
        senteOnBoard: `23R,24n`,
        goteOnBoard: `11k,21n,22b,13r`,
        senteOnHand:`n`,
        moves: ["s-1223","g-0013","sd23n","x"],
    },{
        title: 'Problem 9',
        caption: '3 moves mate',
        senteOnBoard: `11s,15p,24r`,
        goteOnBoard: `13k,21r`,
        senteOnHand:`g`,
        moves: ["sd23g","g-0021","s-1424","x"],
    },{
        title: 'Problem 10',
        caption: '3 moves mate',
        senteOnBoard: `41B,33R,24p`,
        goteOnBoard: `12k,21s`,
        senteOnHand:``,
        moves: ["s-1333","g-0012","s-2341","x"],
    },{
        title: 'Problem 11',
        caption: '3 moves mate',
        senteOnBoard:`13s,14k,15p,24g`,
        goteOnBoard: `12k,21s`,
        senteOnHand:``,
        moves: ["s-2333","g-0024","s-2534","x"],
    },{
        title: 'Problem 12',
        caption: '3 moves mate',
        senteOnBoard:`14p,23B,24l`,
        goteOnBoard: `11l,21k,31b,32g`,
        senteOnHand:`s`,
        moves: ["s-1223","g-0021","sd21s","x"],
    },{
        title: 'Problem 13',
        caption: '3 moves mate',
        senteOnBoard:`15b,25n,43R`,
        goteOnBoard: `12l,14p,22k,31p`,
        senteOnHand:'',
        moves: ["s-2343","g-0022","s+3315","x"],

    },{
        title: 'Problem 14',
        caption: '3 moves mate',
        senteOnBoard:`23b,43R`,
        goteOnBoard: `14p,21n,22b,52R,31k`,
        senteOnHand:`n`,
        moves: ["s+4123","g-0052","sd23n","x"],

    },{
        title: 'Problem 15',
        caption: '3 moves mate',
        senteOnBoard:`13B,35n`,
        goteOnBoard: `11l,21k,31p,42p`,
        senteOnHand:`l`,
        moves: ["sd22l","g-3221","s-2313","x"],
    },{
        title: 'Problem 16',
        caption: '3 moves mate',
        senteOnBoard:`25n,44R,52b`,
        goteOnBoard: `21s,22p,32k,51B`,
        senteOnHand:``,
        moves: ["s+4152","g-0051","s-3344","x"],
    },{
        title: 'Problem 17',
        caption: '3 moves mate',
        senteOnBoard:`15r,16p,22s,44R`,
        goteOnBoard: `21n,23p,24k,34s`,
        senteOnHand:``,
        moves: ["s-3344","g-0021","s-1322","x"],
    },{
        title: 'Problem 18',
        caption: '5 moves mate',
        senteOnBoard:`53r,34n`,
        goteOnBoard: `21n,31k,32g`,
        senteOnHand:`g`,
        goteOnHand:'p',
        moves: ["s+5153","gd41p","sd22g","g-0032","s+4234","x"],
    },{
        title: 'Problem 19',
        caption: '5 moves mate',
        senteOnBoard:`31R,44b,26p`,
        goteOnBoard: `13k,14s,23n`,
        senteOnHand:`s`,
        goteOnHand:'',
        moves: ["sd22s","g-2413","s-3531","g-0023","s+3344","x"],
    },{
        title: 'Problem 20',
        caption: '5 moves mate',
        senteOnBoard:`25p,32s,42R`,
        goteOnBoard: `12g,22k,23p`,
        senteOnHand:`n`,
        goteOnHand:'',
        moves: ["s-2132","g-0022","sd33n","g-1121","s-3142","x"],
    },{
        title: 'Problem 21',
        caption: '5 moves mate',
        senteOnBoard:`21R,25B`,
        goteOnBoard: `13k,22n,23n`,
        senteOnHand:`n,l`,
        goteOnHand:'',
        moves: ["sd14l","g-0022","s-3525","g-0023","sd25n","x"],
    },{
        title: 'Problem 22',
        caption: '5 moves mate',
        senteOnBoard:`22P,25n,34B`,
        goteOnBoard: `13g,14k,15s,21n`,
        senteOnHand:``,
        goteOnHand:'',
        moves: ["s+1325","g-0021","sd25g","g-0013","s-2334","x"],
    },{
        title: 'Problem 23',
        caption: '5 moves mate',
        senteOnBoard:`15b,16l,33P,35p`,
        goteOnBoard: `14k,25g,32b`,
        senteOnHand:`g`,
        goteOnHand:'',
        moves: ["sd13g","g-0014","s-2415","g-0013","s-3433","x"],
    },{
        title: 'Problem 24',
        caption: '5 moves mate',
        senteOnBoard:`24R,43r`,
        goteOnBoard: `11l,12p,13b,21n,31k,32p`,
        senteOnHand:`n`,
        goteOnHand:'',
        moves: ["s-2224","g-0031","sd34n","g-3122","s+4243","x"],
    },{
        title: 'Problem 25',
        caption: '5 moves mate',
        senteOnBoard:`25r,36B`,
        goteOnBoard: `12p,14k,22b,33r,34l`,
        senteOnHand:`p`,
        goteOnHand:'',
        moves: ["sd15p","g-1314","s+2325","g-0013","s-1436","x"],
    },{
        title: 'Problem 26',
        caption: '5 moves mate',
        senteOnBoard:`23P,26p,32b`,
        goteOnBoard: `11l,14k,15p,31p,34g`,
        senteOnHand:`g,g`,
        goteOnHand:'',
        moves: ["sd24g","g-0034","s-1223","g-3231","sd13g","x"],
    },{
        title: 'Problem 27',
        caption: '5 moves mate',
        senteOnBoard:`33p,44b`,
        goteOnBoard: `13p,22k,23p,31s,41n,43s`,
        senteOnHand:`r,g`,
        goteOnHand:'',
        moves: ["sd42r","g-0031","s+3233","g-0022","sd22g","x"],
    },{
        title: 'Problem 28',
        caption: '5 moves mate',
        senteOnBoard:`12R,23p,41b,51P`,
        goteOnBoard:`21s,31k,33p,43p`,
        senteOnHand:``,
        goteOnHand:'',
        moves: ["s-4212","g-0031","s+5241","g-3242","s-4152","x"],
    },{
        title: 'Problem 29',
        caption: '5 moves mate',
        senteOnBoard:`15r,43b`,
        goteOnBoard:`12B,22p,24k,42p`,
        senteOnHand:`g`,
        goteOnHand:'',
        moves: ["sd35g","g-3324","s+1315","g-0012","s-3435","x"],
    },{
        title: 'Problem 30',
        caption: '11 moves mate',
        senteOnBoard:`11r,14B,25p,44n`,
        goteOnBoard:`15p,31p,34g,45s,22k`,
        senteOnHand:``,
        goteOnHand:'',
        moves: ["s+3111","g-1222","s-2314","g-0012","s-3231","g-1323","sd14p","g-0013","s-3432","g-0045","sd24g","x"],
    },
]


const select = document.getElementById('tsumeSet');

select.selectedIndex = 0; //set the first option as initial value.



tsumeStarters.forEach((problem, index) => {
    select.options[select.options.length] = new Option(problem.title, index);
})


const setData = (index) => {
    const boardData = tsumeStarters[index]
    const inputBox = document.getElementById('bInput')
    inputBox.value = encodeURIComponent(JSON.stringify({...boardData, sideComment: true}))
    inputBox.dispatchEvent(new Event('change'));
}


select.addEventListener('change',
    e => {
        e.preventDefault();
        setData(e.currentTarget.value)

    })

const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

nextButton.addEventListener('click', e => {
    e.preventDefault();
    if (select.selectedIndex === tsumeStarters.length - 1) select.selectedIndex = 0;
    else select.selectedIndex += 1;
    setData(select.selectedIndex);
})

prevButton.addEventListener('click', e => {
    e.preventDefault();
    if (select.selectedIndex === 0) select.selectedIndex = tsumeStarters.length - 1;
    else select.selectedIndex -= 1;
    setData(select.selectedIndex);
})



/*window.addEventListener('load', function () {
    setData(0)
})*/

