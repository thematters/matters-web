// import React from 'react'
// import Home from './index.jsx'
// import { shallow, configure } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16';

// configure({ adapter: new Adapter() });

// const setup = () => {
//   // 模拟 props
//   const props = {
//     // Jest 提供的mock 函数
//     onAddClick: jest.fn( (e) => {
//     })
//   }

//   // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
//   const wrapper = shallow(<Home />)
//   return {
//     props,
//     wrapper
//   }
// }

// describe('AddTodoView', () => {
//   const { wrapper, props } = setup();

//   // case1
//   // 通过查找是否存在 Input,测试组件正常渲染
//   it('AddTodoView Component should render', () => {
//     //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
//     // 详细用法见 Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html
//     expect(wrapper.find('input').exists());
//   })

//   // case4
//   // 创建完成后，input框被晴空
//   it('input value should be empty when todo is created', () => {
//     const mockEvent = {
//       keyCode: 13, // enter 事件
//       target: {
//         value: 'Test'
//       }
//     }
//     // 通过 Enzyme 提供的 simulate api 模拟 DOM 事件
//     wrapper.find('input').simulate('keyup',mockEvent)
//     expect(mockEvent.target.value === '')
//   })
// })
