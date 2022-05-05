import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Layout, Button, Menu, Dropdown, Divider, Select, Checkbox, List, message } from 'antd';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  MarkerType
} from 'react-flow-renderer';
import * as services from '../../services/design';
import Sidebar from './Sidebar';
import FlowNode from './Node/FlowNode'
import CopyNode from './Node/CopyNode'
import EndNode from './Node/EndNode'

import './index.css';
import { isDataExist } from 'utils/dataTools';
import { observable } from 'mobx';

const { Header, Sider, Content } = Layout;
const { Option } = Select;
const initialNodes = [
  {
    "id": "0",
    "type": "input",
    "data": {
      "label": "开始流程",
      'person': []
    },
    "position": {
      "x": 254,
      "y": -76
    },
    "positionAbsolute": {
      "x": 254,
      "y": -76
    }
  },
  {
    "id": "-1",
    "type": "end",
    "data": {
      "label": "结束流程",
      'person': []

    },
    "position": {
      "x": 198,
      "y": 112
    },
    "positionAbsolute": {
      "x": 198,
      "y": 112
    }
  },
  {
    "id": "node_1",
    "type": "FlowNode",
    "position": {
      "x": 236.25,
      "y": 32.5
    },
    "data": {
      "label": "FlowNode node",
      'person': []
    },
    "positionAbsolute": {
      "x": 236.25,
      "y": 32.5
    }
  }
];
const initialEdges = [
  {
    "source": "0",
    "sourceHandle": null,
    "target": "node_1",
    "targetHandle": "top",
    "markerEnd": {
      "type": "arrow"
    },
    "id": "reactflow__edge-0-node_1top"
  },
  {
    "source": "node_1",
    "sourceHandle": "bottom",
    "target": "-1",
    "targetHandle": null,
    "markerEnd": {
      "type": "arrow"
    },
    "id": "reactflow__edge-node_1bottom--1"
  }
]
const nodeTypes = { FlowNode: FlowNode, CopyNode: CopyNode, end:EndNode };

let id = 0;
const getId = () => `node_${++id}`;
const store = observable({})

function DnDFlow(props) {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [perArr, setPerArr] = useState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeName, setNodeName] = useState('');
  const [nodeId, setNodeId] = useState('');
  const [person,setPerson] = useState({});
  const [children,setChildren] = useState([])

  // const children = [];
  const field = [];
  let fieldProp = {};
  // Object.keys(person).map((item) => {
  //   if (personList[item] != undefined) {
  //     children.push(<Option key={personList[item].id}>{personList[item].nickName}</Option>)
  //   }
  // })
  // for (let i = 10; i < 36; i++) {
  //   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  // }
  field.map((item) => {
    fieldProp[item.propertyId] = []
  })
  useEffect(() => {
    let personList = Object.assign({},props.location.state.PersonListT)
    // console.log(personList);
    // setPerson(personList);
    console.log(person);
    let newC = []
    Object.keys(personList).map((item) => {
      if (personList[item] != undefined) {
        newC.push(<Option key={personList[item].id}>{personList[item].nickName}</Option>)
      }
    })
    setPerson(personList);
    setChildren(newC);
  },[])
  useEffect(() => { 
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: nodeName,
            person: perArr
          };
        }
        return node;
      })
    );
  }, [nodeName, setNodeName, perArr, setPerArr]);

  const onConnect = useCallback((params) => {
    let obj = {
      type: MarkerType.Arrow,
    }
    params.markerEnd = obj
    setEdges((eds) => addEdge(params, eds))
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      // personList = Object.assign({},props.location.state.PersonListT)
      let params = {}
      params.firstFormId = props.location.state.firstFormId;
      params.edges = flow.edges
      params.nodes = []
      flow.nodes.map((item) => {
        let obj = {}
        obj.id = item.id
        obj.type = item.type
        obj.position = item.position
        obj.positionAbsolute = item.positionAbsolute
        console.log(item.data.person);
        if (item.data.person != undefined && item.data.person.length != 0) {
          console.log(Number(item.data.person));
          console.log(person);
          let person1 = person[Number(item.data.person) - 1]
          item.data.principal = person1['username'];
          item.data.userId = person1['id'];
        }
        obj.data = item.data
        params.nodes.push(obj)
      })
      console.log(params);
      try {
        let res = services.putRequest(services.requestList.addFlow, params);
        if (isDataExist(res)) {
          return res;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [reactFlowInstance]);

  const onNodeClick = useCallback((event, node) => {
    setNodeId(node.id)
    setPerArr(node.data.person)
    setNodeName(node.data.label)
  }, [nodeName], [nodeId])

  const handleChange = (value) => {
    setPerArr(value);
    console.log(`selected ${value}`);
  }

  function checkChange(checkedValues,a) {
    fieldProp[a] = checkedValues
  }
  return (
    <Layout>
      <Header className='header'>
        <Button type="primary" className='save' onClick={onSave}>保存</Button>
      </Header>
      <Layout>
        <Content>
          <Layout>
            <Header className='title'>
              <Sidebar />
            </Header>
            <Content>
              <div className="dndflow">
                <ReactFlowProvider>
                  <Content>
                    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                      <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        nodeTypes={nodeTypes}
                        onNodeClick={onNodeClick}
                        fitView
                      >
                        <Controls />
                        <MiniMap />
                      </ReactFlow>
                    </div>
                  </Content>
                </ReactFlowProvider>
              </div>
            </Content>
          </Layout>
        </Content>
        <Sider style={{ backgroundColor: 'white' }} width='300'>
          <div className="updatenode__controls">
            <div>
              <label>节点名:</label>
              <input value={nodeName} onChange={(evt) => setNodeName(evt.target.value)} />
            </div>
            <div>
              <label>负责人：</label>
              <Select
                // mode="multiple"
                allowClear
                style={{ width: '80%', marginTop: '10px' }}
                placeholder="Please select"
                value={perArr}
                onChange={handleChange}
              >
                {children}
              </Select>
            </div>
            {
              field.map((item) => {
                return <div className='dataInfo'>
                  <label>{item.name}:</label>
                  <Checkbox.Group name={item.propertyId} options={[{ label: '可见', value: 'vis' }, { label: '可编辑', value: 'edit' }]} onChange={(checkedValues) => checkChange(checkedValues,item.propertyId)}></Checkbox.Group>
                </div>
              })
            }
          </div>
        </Sider>
      </Layout>

    </Layout>

  );
};


export default DnDFlow;
