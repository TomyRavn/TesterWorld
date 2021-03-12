/**
 * @type   : function
 * @access : public
 * @desc   : Active X 컴포넌트 XP 업데이트 KB912945
 * @sig    : cfShowEmbedObject

 * @param  : elementId  Active X 오브젝트 Comment명
 * @author : 이정학
 */
function cfShowEmbedObject(elementId){
 document.write(elementId.text);

 // 동일한 ID를 사용하기 위해 다시 elementID 를 초기화
 elementId.id = "";
}