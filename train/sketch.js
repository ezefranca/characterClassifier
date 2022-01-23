let _upper_ = new Map([['A', []], ['B', []], ['C', []], ['D', []], ['E', []], ['F', []], ['G', []],
['H', []], ['I', []], ['J', []], ['K', []], ['L', []], ['M', []], ['N', []], ['O', []], ['P', []],
['Q', []], ['R', []], ['S', []], ['T', []], ['U', []], ['V', []], ['W', []], ['X', []], ['Y', []], ['Z', []],
]);

let _lower_ = new Map([['a', []], ['b', []], ['c', []], ['d', []], ['e', []], ['f', []], ['g', []],
['h', []], ['i', []], ['j', []], ['k', []], ['l', []], ['m', []], ['n', []], ['o', []], ['p', []],
['q', []], ['r', []], ['s', []], ['t', []], ['u', []], ['v', []], ['w', []], ['y', []], ['x', []], ['z', []],
]);

let _number_ = new Map([['0', []], ['1', []], ['2', []], ['3', []], ['4', []], ['5', []], ['6', []],
['7', []], ['8', []], ['9', []]]);

let classifier;
let uppers;
let lowers;
let numbers;
let totalImages = 150;

function preload() {

  uppers = Object.fromEntries(_upper_)
  lowers = Object.fromEntries(_lower_)
  numbers = Object.fromEntries(_number_)

  for (index = 'A'.charCodeAt(); index <= 'Z'.charCodeAt(); index++) {
    let label = String.fromCharCode(Number(index))
    for (let position = 0; position < totalImages; position++) {
      let fileNameSufix = nf(position + 1, 4, 0);
      uppers[label][position] = loadImage(`./data/upper/${label}_${fileNameSufix}.png`);
    }
  }

  for (index = 'a'.charCodeAt(); index <= 'z'.charCodeAt(); index++) {
    let label = String.fromCharCode(Number(index))
    for (let position = 0; position < totalImages; position++) {
      let positionIndex = nf(position + 1, 4, 0);
      lowers[label][position] = loadImage(`./data/lower/${label}_${positionIndex}.png`);
    }
  }

  for (index = 0; index <= 9; index++) {
    let label = String(index)
    for (let position = 0; position < totalImages; position++) {
      let positionIndex = nf(position + 1, 4, 0);
      numbers[label][position] = loadImage(`./data/number/${label}_${positionIndex}.png`);
    }
  }
}





function setup() {
  createCanvas(400, 400);

  let options = {
    inputs: [64, 64, 4],
    task: 'imageClassification',
    debug: true
  };

  classifier = ml5.neuralNetwork(options);

  for (index = 'A'.charCodeAt(); index <= 'Z'.charCodeAt(); index++) {
    let label = String.fromCharCode(Number(index))
    for (let position = 0; position < totalImages; position++) {
      classifier.addData({ image:  uppers[label][position] }, { label: label });
    }
  }

  for (index = 'a'.charCodeAt(); index <= 'z'.charCodeAt(); index++) {
    let label = String.fromCharCode(Number(index))
    for (let position = 0; position < totalImages; position++) {
      classifier.addData({ image:  lowers[label][position] }, { label: label });
    }
  }

  for (index = 0; index <= 9; index++) {
    let label = String(index)
    for (let position = 0; position < totalImages; position++) {
      classifier.addData({ image:  numbers[label][position] }, { label: label });
    }
  }

  classifier.normalizeData();
  classifier.train({ epochs: 50 }, finishedTraining);
}

function finishedTraining() {
  console.log('finished training!');
  classifier.save();
}
