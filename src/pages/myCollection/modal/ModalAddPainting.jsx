import React, { useState } from 'react';
import styles from '../page.module.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CardHeader, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';

// Giả định dữ liệu ảnh
const initialImages = [
  { id: '1', url: 'https://via.placeholder.com/100' },
  { id: '2', url: 'https://via.placeholder.com/100' },
  { id: '3', url: 'https://via.placeholder.com/100' },
  { id: '4', url: 'https://via.placeholder.com/100' },
  { id: '5', url: 'https://via.placeholder.com/100' },
  { id: '6', url: 'https://via.placeholder.com/100' },
  { id: '7', url: 'https://via.placeholder.com/100' },
  { id: '8', url: 'https://via.placeholder.com/100' },
];

function ModalAddPainting({ show, onHide }) {
  const [images, setImages] = useState(initialImages);
  const [collection, setCollection] = useState([]);
  const handleHide = () => {
    onHide()
  }
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return; // Nếu không có điểm đến thì không làm gì

    if (source.droppableId === 'imageList' && destination.droppableId === 'collection') {
      // Di chuyển từ imageList sang collection
      const movedImage = images[source.index];
      setImages(images.filter((_, index) => index !== source.index));
      setCollection([...collection, movedImage]);
    } else if (source.droppableId === 'collection' && destination.droppableId === 'imageList') {
      // Di chuyển từ collection về imageList
      const movedImage = collection[source.index];
      setCollection(collection.filter((_, index) => index !== source.index));
      setImages([...images, movedImage]);
    }
  };

  const handleImageClick = (image, from) => {
    if (from === 'imageList') {
      setImages(images.filter(img => img.id !== image.id));
      setCollection([...collection, image]);
    } else if (from === 'collection') {
      setCollection(collection.filter(img => img.id !== image.id));
      setImages([...images, image]);
    }
  };

  return (
    <Dialog 
      fullWidth={true}
      maxWidth={'xl'}
      open={show}
      onClose={handleHide}>
      <DialogTitle>
        <CardHeader title={
          <Typography sx={
            { textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '3.5rem',
              userSelect: 'none'
            }
          } variant="h5" component="div">
            Thêm tranh vào bộ sưu tập
          </Typography>
        } />
      </DialogTitle>
      <DialogContent>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.app}>
            <Droppable droppableId="imageList" direction="horizontal">
              {(provided) => (
                <div
                  className={styles.image_list}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {images.map((image, index) => (
                    <Draggable key={image.id} draggableId={image.id} index={index}>
                      {(provided) => (
                        <div
                          className={styles.image_item}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => handleImageClick(image, 'imageList')}
                        >
                          <img src={image.url} alt="Thumbnail" />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="collection">
              {(provided) => (
                <div
                  className={styles.collection}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {collection.map((image, index) => (
                    <Draggable key={image.id} draggableId={image.id} index={index}>
                      {(provided) => (
                        <div
                          className={styles.collection_item}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => handleImageClick(image, 'collection')}
                        >
                          <img src={image.url} alt="Thumbnail" />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </DialogContent>
    </Dialog>
      
  );
}

export default ModalAddPainting;
