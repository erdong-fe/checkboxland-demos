import { Checkboxland } from 'checkboxland';
import { useEffect } from 'react';

const Snake = () => {
    let snakeDemo;
    let snake;

    // 初始化游戏相关的数据
    const _initGame = () => {
        snakeDemo = new Checkboxland({
            dimensions: '44x15',
            selector: '#snake-demo'
        });
        snake = [{ x:2, y:7 }, { x:1, y:7 }, { x:0, y:7 }];
        _draw();
    }
    
    const _draw = () => {
        const emptyMap = snakeDemo.getEmptyMatrix();

        // 画snake
        snake.forEach(item => {
            emptyMap[item.y][item.x] = 1;
        })

        snakeDemo.setData(emptyMap);
    }

    useEffect(
        () => {
            _initGame();
        }
    )

    return (
        <div id="snake-demo">

        </div>
    )
};

export default Snake;
