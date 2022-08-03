/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-08-03 00:55:54
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-03 06:20:24
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\self_item\rich_text.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import './index.css'
import React, { useEffect, useState } from 'react';
import { message } from 'antd';

const { createEditorState } = BraftEditor;

const RichTextEditor = ({ name, onChange, value, ...rest }) => {
    const [editor, set] = useState(null);

    useEffect(() => {
        if (value !== undefined) {
            set(createEditorState(value));
        }
    }, [value]);

    const handleChange = editor => {
        set(editor);
   };

    const onSave = () => {
       const htmlContent = editor.toHTML();
        if (name) {
            onChange(name, htmlContent);
        } else {
            onChange(htmlContent);
        }
    };
    const controls = ['bold', 'italic', 'underline','media', 'text-align', 'text-color','link','font-size']
    return (
        <div style={{ border: '1px solid rgba(0,0,0,0.2)' }}>
            <BraftEditor
                contentStyle={{ minHeight: 100, height: 'auto', maxHeight: 100,zIndex:'999' }}
                controlBarClassName={"my_controller"}
                textAligns={['left', 'center', 'right']}
                media={{
                    validateFn:(file) => {
                        if(file.size <= 1024 * 1024){
                            return true
                        }else{
                            message.info('上传文件需小于1MB')
                        }
                    },
                    accepts:{image:'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg'}
                }}
                controls={controls}
                value={editor}
                onChange={handleChange}
                onSave={onSave}
                onBlur={onSave}
            />
        </div>
    );
};

export default RichTextEditor;