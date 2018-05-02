var canvas = document.getElementById('canvas');
var canvasSize = canvas.width;
var blockSize = Math.sqrt(canvasSize);
var id = setInterval(frame, 100);
var mode = "easy";
var scoreText = document.getElementById("scoreText");


const ctx = canvas.getContext('2d');

var grid = [];

/*
 * Modes:
 * -Easy: seek points and grow; avoid hitting the wall or yourself.
 * -Hard: each point spawns an enemy snake which moves in random 
 * directions.
 */


/* 
 * Initialize gride with (x,y) coordinates for each position.
 * Each grid[y][x] holds an array containing the pixel coordinates
 * for the grid location.
 */
for (var i = 0; i < blockSize; i++)
{
    var row = [];
    for (var j = 0; j < blockSize; j++)
    {
        row[j] = [j * blockSize, i * blockSize];
    }
    grid[i] = row;
}

// Spawn the snake
let snake = new Snake(blockSize, grid);

// Spawns the initial point on the grid.
createPoint();

function frame()
{
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    drawGrid();
    drawPoint();
    try
    {
        snake.draw();

        // Check for point
        if (hitPoint(snake.head.x, snake.head.y))
        {
            snake.push(snake.head.x, snake.head.y);
        }

        // Check for collision
        if (snake.checkForCollision())
        {
            snake.reset();
        }

        // Update score on the jumbotron
        scoreText.innerHTML = ("Score: " + snake.length);
    }
    catch (error)
    {
        console.log(error);
        snake.reset();
    }
}

/*
 * Draw the game grid.
 */
function drawGrid()
{
    ctx.fillStyle = "#4286f4";
    for (var i = 0; i < blockSize; i++)
    {
        var row = grid[i];
        for (var j = 0; j < blockSize; j++)
        {
            ctx.fillRect(row[j][0], row[j][1], blockSize - 1, blockSize - 1);
        }
    }
}

/* 
 * Initilize the point on the grid with a starting location.
 */
function createPoint()
{
    var x = Math.floor((Math.random() * blockSize - 1) + 1);
    var y = Math.floor((Math.random() * blockSize - 1) + 1);

    point = new Block(x, y, blockSize - 1, blockSize - 1);
}

/* 
 * Check for keypress and use it to set the snake direction.
 */
window.onkeydown = function (e)
{
    var code = e.keyCode ? e.keyCode : e.which;

    snake.setDirection(code);
}

/* 
 * Check if the head of the snake has hit a point object.
 */
function hitPoint(x, y)
{
    if (point.x == x && point.y == y)
    {
        createPoint();
        return true;
    }
    else return false;
}

/* 
 * Draw the point in the grid.
 */
function drawPoint()
{
    ctx.fillStyle = "#42f4e5";
    ctx.fillRect(grid[point.y][point.x][0], grid[point.y][point.x][1], blockSize - 1, blockSize - 1);
}

/*
 * Toggle between easy mode and hard mode.
 */
function toggleMode()
{
    if (mode == "easy")
    {        
        mode = "hard";
    }
    else 
    {
        // Simple mode with just regular snake gameplay. Seek the points and grow.
        mode = "easy";
    }

    snake.reset();
}
