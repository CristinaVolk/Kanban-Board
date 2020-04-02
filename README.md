
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build
```
# Note: 
Из-за трудностей с API_KEY, в приложении отсутствует функциональность модификации seq_num карточки, но я бы хотела предложить мое решение ниже, так как представляю как это реализовать в программе.

TaskLane.vue ( здесь вызываю action и передаю перетянутый элемент и тот, который расположен по соседству ниже) 
```
  this.$store.dispatch( 'reorderTaskListItems', {
					itemToPush: itemToPush,
					relatedItem: evt.relatedContext.element,
				} );
```

actions.js (нахожу в массиве состояния элемент, который был перетянут и изменяю row на значение row соседнего элемента, делаю request и отсылаю обновленный элемент)
```
    reorderTaskListItems ( { commit, state }, payload )	{
          const itemIdx = state.items.findIndex( task => task.id === payload.itemToPush.id );			
          state.items[ itemToPushIndex ].row = payload.relatedItem.row;
          return axios.patch( `${ INITIAL_DATA_URL }/cards/${updatedItem.id}`, state.items[ itemToPushIndex ] )
            .then( res => {
          commit( "reorder_Items", state.items[ itemToPushIndex ], payload.relatedItem );
        } );
      },
 ```
 mutations.js (для того чтобы в дальнейшем массив пересортировался и перетянутый элемент остался в колонке,в которую был перетянут, нахожу индех элементаб расположенного по соседству в массиве заданий и затем на одно место выше этого элемента ставлю перетянутый элемент)
  ```
   reorder_items ( state, { itemToPush, relatedItem} ) {
        const itemToPushIndex = state.items.findIndex( task => task.id == itemToPush.id );
        const relatedItemIndex = state.items.findIndex( task => task.id == relatedItem.id );      
        state.items[relatedItemIndex-1] = itemToPush
       }
  ```
  
