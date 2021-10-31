import { Checkboxland } from 'checkboxland';
import { useEffect } from 'react';

const directionMap = {
    'left': '37',
    'right': '39',
    'up': '38',
    'down': '40'
};

const Snake = () => {
    let snakeDemo;
    let snake;
    let interval;
    let speed = 200;
    let direction = directionMap.right; // 初始化默认向右

    // 初始化游戏相关的数据
    const _initGame = () => {
        snakeDemo = new Checkboxland({
            dimensions: '44x15',
            selector: '#snake-demo'
        });
        snake = [{ x:0, y:7 }, { x:1, y:7 }, { x:2, y:7 }];

        document.querySelector('body')
        .addEventListener('keydown', _onChangeDirection);

        interval = setInterval(_moveSnake, speed);
    }

    // 绘制
    const _draw = () => {
        const emptyMap = snakeDemo.getEmptyMatrix();
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
