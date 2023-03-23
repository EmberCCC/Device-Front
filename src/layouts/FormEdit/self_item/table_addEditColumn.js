import {inject, observer} from "mobx-react";


const addEditColumn = observer((props) => {


})
export default inject((stores) => ({ TableStore: stores.TableStore, FormStore: stores.FormStore, HomeStore: stores.HomeStore }))(addEditColumn)
