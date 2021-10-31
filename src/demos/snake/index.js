import { Checkboxland } from 'checkboxland';
import { useEffect } from 'react';

const Snake = () => {
    let snakeDemo;
    let snake;
    let interval;
    let speed = 200;

    // 初始化游戏相关的数据
    const _initGame = () => {
        snakeDemo = new Checkboxland({
            dimensions: '44x15',
            selector: '#snake-demo'
        });
        snake = [{ x:0, y:7 }, { x:1, y:7 }, { x:2, y:7 }];
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
        for(let i = 0; i < snake.length; i++) {
            snake[i].x++;
        }
        _draw();
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
