import { Checkboxland } from 'checkboxland';
import { useEffect } from 'react';

const directionMap = {
    'left': '37',
    'right': '39',
    'up': '38',
    'down': '40'
};

const Snake = () => {
    const gameAreaWidth = 44;
    const gameAreaHeight = 15;

    let snakeDemo;
    let snake;
    let interval;
    let speed = 200;
    let direction;
    let apple;

    // 初始化游戏相关的数据
    const _initGame = () => {
        snakeDemo = new Checkboxland({
            dimensions: '44x15',
            selector: '#snake-demo'
        });
        snake = [{ x:0, y:7 }, { x:1, y:7 }, { x:2, y:7 }];
        apple = { x:24, y:7 };
        direction = directionMap.right;

        document.querySelector('body')
        .addEventListener('keydown', _onChangeDirection);

        interval = setInterval(_moveSnake, speed);
    }

    // 绘制
    const _draw = () => {
        const emptyMap = snakeDemo.getEmptyMatrix();
        // 画苹果
        emptyMap[apple.y][apple.x] = 2;
        // 画snake
        snake.forEach(item => {
            emptyMap[item.y][item.x] = 1;
        })
        snakeDemo.setData(emptyMap);
    }

    // 移动snake
    const _moveSnake = () => {
        // 调整除过蛇头以外的节点
        for(let i = 0; i < snake.length - 1; i++) {
            snake[i] = Object.assign({}, snake[i+1]);
        }

        // 调整蛇头节点
        const snakeHead = snake[snake.length-1];
        switch (direction) {
            case directionMap.up:
                snakeHead.y--;
                break;
            case directionMap.right:
                snakeHead.x++;
                break;
            case directionMap.down:
                snakeHead.y++;
                break;
            case directionMap.left:
                snakeHead.x--;
                break;
            default:
                break;
        }
        
        // 判定snake是否超出游戏区域边界
        if (_isSnakeCrossBorder()) {
            alert('游戏失败，重新开始');
            clearInterval(interval);
            _initGame();
        }

        // 是否吃到苹果
        if (_isEatingApple()) {
            const snakeTail = Object.assign({}, snake[0]);
            snake.unshift(snakeTail);
            _generateApple();
        }

        _draw();
    }

    // 响应键盘输入改变方向
    const _onChangeDirection = (e) => {
        const newCodeKey = e.keyCode.toString();
        if ((newCodeKey === directionMap.left && direction === directionMap.right)
            || (newCodeKey === directionMap.right && direction === directionMap.left)
            || (newCodeKey === directionMap.up && direction === directionMap.down)
            || (newCodeKey === directionMap.down && direction === directionMap.up)) {
                return;
        }
        direction = newCodeKey;
    }

    // 是否吃到苹果
    const _isEatingApple = () => {
        return snake[snake.length-1].x === apple.x && snake[snake.length-1].y === apple.y;
    }

    // 生成苹果
    const _generateApple = () => {
        let newAppleX;
        let newAppleY;
        let isOverlappingSnake = true;  // 是否与贪吃蛇重合

        while (isOverlappingSnake) {
            newAppleX = Math.floor(Math.random() * gameAreaWidth);
            newAppleY = Math.floor(Math.random() * gameAreaHeight);

            isOverlappingSnake = snake.some((item) => (item.x === newAppleX) && (item.y === newAppleY))
        }

        apple = {
            x: newAppleX,
            y: newAppleY
        }
    }

    // 贪吃蛇是否越界
    const _isSnakeCrossBorder = () => {
        const snakeHead = snake[snake.length-1];
        return snakeHead.x < 0 || snakeHead.y < 0 || snakeHead.x > gameAreaWidth-1 || snakeHead.y > gameAreaHeight-1;
    }

    useEffect(
        () => {
            _initGame();
        }
    )

    return (
        <div id="snake-demo" />
    )
};

export default Snake;
