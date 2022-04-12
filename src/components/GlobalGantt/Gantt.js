import React,{Component} from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import { GANTT_LOCALE } from './configs';
import './index.less';

export default class Gantt extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.zoom !== nextProps.zoom;
  }
  componentDidUpdate() {
    this.hideCol()
    gantt.render();
  }
  componentWillUnmount() {
    if (this.dataProcessor) {
      this.dataProcessor = null;
    }
  }
  componentWillMount() {
    gantt.locale = GANTT_LOCALE;
    this.initBasicGantt();
    this.initGanttScale(); // gantt 显示上的初始化设置
    this.initTemplateWorkTime(); // 设置工作日和非工作日的区别显示
    this.initLightBoxContent(); // 设置弹出框内容
  }
  componentDidMount(){
    const { tasks } = this.props;
    gantt.init(this.ganttContainer);
    gantt.parse(tasks);
    /* 按需隐藏对应列--- 直接操作dom= = */
    this.hideCol()
    this.props.didmount()
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    this.hideCol()
    // this.
  }
  hideCol = ()=>{
    let addNodes = document.getElementsByClassName('grid_row_class_zyn');
    for(let lv1 of addNodes){
      for(let lv2 of lv1.childNodes){
        for(let lv3 of lv2.childNodes){
          if(lv3.getAttribute('class').indexOf('gantt_add') > -1){
            lv3.style.display = 'none';
            lv3.classList.remove('gantt_add');
          }
        }
      }
    }
  }
  /* 设置工作时间 */
  initTemplateWorkTime = ()=>{
    const workHours = [9,18];
    gantt.config.work_time = true;
    // gantt.config.skip_off_time = true; 
    gantt.setWorkTime({day:5,hours:workHours});
    gantt.templates.scale_cell_class = (date) => {
      //调试器;
      if(!gantt.isWorkTime(date)){
        return "weekend";
      }
    };        
    gantt.templates.task_cell_class = (task,date) => {

      /* 区别工作时间 */
      if(this.props.zoom === 'Hours'){
        if (date.getHours() < workHours[0]) {
          return "no_work_hour";
        }
        if (date.getHours() > workHours[1]) {
          return "no_work_hour";
        }
      }
      if(!gantt.isWorkTime({task:task, date:date})){
        return "weekend" ;
      } 
    };
    
  }

  /* 设置gantt展示 */
  initGanttScale = ()=>{
    gantt.config.columns=[
      {name:"name", label:"设备", tree:true, width:"*" },
      {name:"capacityValue", label:"产能",align:"center" },
      {name:"add", label:"" }
    ];
    gantt.config.scale_unit = "month"; //按年显示
    gantt.config.step = 1;	//设置时间刻度的步长（X轴）
    gantt.config.date_scale = "%F, %Y";	//日期尺度按年
    gantt.config.subscales = [
      {unit: "day", step: 1, date: "%j, %D"}
    ];
    /* 排程图不同物料添加的 颜色判断 添加过程 */
    gantt.templates.task_class = function (start, end, task) {
      // console.log(start,end,task)
      // let componentcode = ;
      // if (task.componentCode == componentcode){
      //   return "blue"
      // } else {
      //   return "gray"
      // }
    };
    gantt.templates.grid_row_class = function(start, end, task){
      if(task.hideAdd)
        return "grid_row_class_zyn";
      
    };
    
  }
  /* 设置基本信息 */
  initBasicGantt = ()=>{
    gantt.config.auto_scheduling = true;//启用自动调度
    gantt.locale.labels.section_split = "Display";
    gantt.config.xml_date = "%Y-%m-%d %H:%i";
    gantt.config.date_scale = "%m-%d"; //时间格式
    gantt.config.order_branch = false;//锁定左侧不让拖拽
    gantt.config.fit_tasks = true;  //当task的长度改变时，自动调整图表坐标轴区间用于适配task的长度
    gantt.config.grid_resizer_attribute = "gridresizer"; //设置 resizer(调整宽度的那个东西) DOM元素的属性名
    // gantt.config.grid_width = 600;//左侧列表宽度
    // gantt.config.min_column_width = 150;//时间轴列宽度
    gantt.config.prevent_default_scroll = true;//阻止鼠标滚动事件冒泡
    gantt.config.preserve_scroll = false;//图表刷新后，滚动条的位置跟原来保持一致
    gantt.config.redo = true;//重做功能
    gantt.config.scroll_on_click= false;//当点击任务时，时间轴的滚动条滚动，将任务放在可见的范围。
    gantt.config.scroll_size = 20;//滚动条尺寸
    gantt.config.show_task_cells = true;//时间轴图表中，如果不设置，只有行边框，区分上下的任务，设置之后带有列的边框，整个时间轴变成格子状
  }
  /* 设置数据更新进程 */
  initGanttDataProcessor() {
    const onDataUpdated = this.props.onDataUpdated;

    this.dataProcessor = gantt.createDataProcessor((entityType, action, item, id) => {
      return new Promise((resolve, reject) => {
        if (onDataUpdated) {
          onDataUpdated(entityType, action, item, id);
        }
        return resolve();
      });
    });
  }

  /* 设置lightbox 弹窗内容 */
  initLightBoxContent(){
    gantt.config.lightbox.sections = [
  		{name: "description", height: 38, map_to: "text", type: "textarea", focus: true,editor:''},
        {name:"capacityValue",map_to: "capacityValue"},
        {name: "time", type: "duration", map_to: "auto"},
  	];
    gantt.locale.labels["section_capacityValue"] = "产能";
    gantt.locale.labels["section_description"] = "加工数量";
    gantt.locale.labels["section_time"] = "时间";
    gantt.locale.labels["icon_save"] = "保存并进行采购";
    
  }
  setZoom(value) {
    switch (value) {
      case 'Hours':
        gantt.config.scale_unit = 'day';
        gantt.config.date_scale = '%d %M';
        gantt.config.scale_height = 60;
        gantt.config.min_column_width = 30;
        gantt.config.subscales = [
            { unit:'hour', step:1, date:'%H' }
        ];
      break;
      case 'Days':
        gantt.config.min_column_width = 70;
        gantt.config.scale_unit = 'week';
        gantt.config.date_scale = '%F, %Y';
        gantt.config.subscales = [
            { unit: 'day', step: 1, date: '%j' }
        ];
        gantt.config.scale_height = 60;
      break;
      case 'Weeks':
        const weekScaleTemplate = (date)=>{
          let dateToStr = gantt.date.date_to_str("%M %Y");
          // let endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
          return dateToStr(date);
        };
        gantt.config.scale_unit = "week";
        gantt.config.step = 1;
        gantt.templates.date_scale = weekScaleTemplate;
        gantt.config.subscales = [
          {unit:"day", step:1, date:"%D,%j" }
        ];
        gantt.config.min_column_width = 20;
        gantt.config.scale_height = 50;
      break;
      case 'Months':
        gantt.config.min_column_width = 70;
        gantt.config.scale_unit = 'year';
        gantt.config.date_scale = '%Y';
        gantt.config.scale_height = 60;
        gantt.config.subscales = [
            { unit:'month', step:1, date:'%F' }
        ];
      break;
      // case 'Year':
      //   gantt.config.scale_unit = "year";
	    // 	gantt.config.step = 1;
      //   gantt.config.date_scale = "%Y"; 
      //   gantt.config.scale_height = 60; 
      // break;
      default:
      break;
    }
  }
  render() {
    const { zoom } = this.props;
    this.setZoom(zoom);
    return (
      <div
        ref={ (input) => { this.ganttContainer = input } }
        style={ { width: '100%', height: '100%' } }
      ></div>
    );
  }
}


