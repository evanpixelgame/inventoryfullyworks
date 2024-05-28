import { createInventoryContainer, createItemSlots } from "./inventoryUtils/createInventoryContainer.js";
import itemContextMenu from "./inventoryUtils/inventoryItemContextMenu.js";
//import customEmitter from '../../../../main.js';
import customEmitter from '../../globalUtils/emitter.js';

export default class Inventory {
  constructor(scene) {

    scene.add.existing(this);
    this.items = [];
    this.inventoryContainer = [];
    this.activeItemBar = [];

  }


  addItem(scene, item) {

    console.log(item);

//****************************ESTABLISH STARTING CONSTANTS********************************************************************** 
    //check if item is already in inventory.items, if it's not, existingItemIndex will return -1
    const existingItemIndex = this.items.findIndex(existingItem => existingItem.name === item.name);
    //access the itemIconContainers (the slots in the scene.inventoryContainer)
    const itemIconContainers = scene.inventoryContainer.itemIconContainers;
    //access the existing itemIcons in the inventoryContainer
    const existingItemIcons = scene.inventoryContainer.itemIcons;
    //access the items in inventory.items
    const items = scene.inventory.items;
//******************************************************************************************************************************
   

        
//****************************ADJUST INVENTORY.ITEMS**************************************************************************** 
    //if the item is already in inventory.items AND the item is stackable, increase the quantity of the item instead of adding it new 
 if (existingItemIndex !== -1 && item.stackable) {
    //  this.items[existingItemIndex].quantity += item.quantity; //make it later so can add multiple items at once without having to call multiple times
   this.items[existingItemIndex].quantity++; //currently increases the quantity by 1 for each time called
   console.log('adjust quantity')
 }
 else {
   //if the item is not in inventory.items or the item is not stackable, add it to inventory.items
   this.items.push(item); 
   console.log('push item now')
    }
    
    console.log('ADJUST THIS.ITEMS LIST FROM ADDITEMS FUNC');
    console.log(this.items);
//******************************************************************************************************************************


    if (scene.inventoryContainer.itemIcons.includes(item) && item.stackable === true && item.quantity > 1) {
      console.log(`testing block for readding items past initial, function in question is:
           scene.inventoryContainer.sprites.forEach((sprite) => {
      if (sprite.textureKey === item.textureKey) {
        sprite.quantity = this.items[existingItemIndex].quantity;
        sprite.itemQuant.setText(sprite.quantity);
      } 
     });`);
      console.log('item:');
      console.log(item);
      console.log('scene.inventoryContainer.sprites:');
      console.log(scene.inventoryContainer.sprites);
      console.log('scene.inventoryContainer.itemIcons:');
      console.log(scene.inventoryContainer.itemIcons);

     scene.inventoryContainer.sprites.forEach((sprite) => {
       if (sprite.textureKey === item.textureKey) {
         console.log('MATCH FOUND IN THE TESTING BLOCK, LOGGING THE SPRITE, THEN THE ITEM');
         console.log(sprite);
         console.log(item);
       
        sprite.quantity = this.items[existingItemIndex].quantity;
        sprite.itemQuant.setText(sprite.quantity);
         
        console.log('NEW INSIDE TESTING BLOCK LOG, AFTER CHANGING QUANTITY AND TEXT: LOGGING THE SPRITE, THEN THE ITEM');
         console.log(sprite);
         console.log(item);
      } 
     });
    }
    
    //else if (scene.inventoryContainer.itemIcons.includes(item) && item.stackable === true && item.quantity > 1) {  
   // }

    else {
      console.log('this item aint in your inventory container or aint stackable, add new one');

    for (let i = 0; i < itemIconContainers.length; i++) {

      //if (itemIconContainers[i].dropZone.isEmpty === false) {
      if (itemIconContainers[i].isEmpty === false) {
        // const itemIcon = scene.add.sprite(0, 0, 'emptySlotSprite');
        console.log('this itemIconContainer is filled, trying next one'); //can delete these 3 lines after testing
      }
      else { //check if slot is empty
        
        console.log('creatingnewinventorysprite::::::::')
        const itemSprite = scene.add.sprite(0, 0, item.textureKey); //add sprite
        //itemSpriteContainers[i].itemSprite = itemSprite;
        // itemSprite.setDepth(100);

        // Add properties of sourceObject to sprite
        itemSprite.name = item.name;
        itemSprite.textureKey = item.textureKey;
        itemSprite.quantity = item.quantity; // Adjust to desired quantity if stacking is enabled
        itemSprite.description = item.description;
        itemSprite.flavorText = item.flavorText;
        itemSprite.stackable = item.stackable;
        itemSprite.consumable = item.consumable;
        itemSprite.onUse = item.onUse;
        itemSprite.onConsume = item.onConsume;

        itemSprite.itemListRef = item;

        itemSprite.setScale(.7);
    
        let lastClickTime = 0;
        let doubleClickDelay = 4000; // Adjust this value as needed
        itemSprite.ContextMenu;
  
        const itemQuant = scene.add.text(itemSprite.x - 20, itemSprite.y + 12, `${itemSprite.quantity}`);
        itemQuant.setOrigin(0, 0);
        itemQuant.fontSize = "12px";
        itemQuant.fill = "#ffffff";
        itemQuant.setDepth(1000);

      


        const itemIcon = scene.add.container(0, 0);
        itemIcon.sprite = itemSprite;
        itemIcon.sprite.itemQuant = itemQuant;
        itemIcon.setSize(64, 64);
        itemIcon.add(itemIcon.sprite);
        itemIcon.add(itemIcon.sprite.itemQuant);
        
        itemIcon.setInteractive({ draggable: true });

        scene.input.setDraggable(itemIcon);
        this.setDragEvents(itemIcon, scene);

        itemIconContainers[i].add(itemIcon); //add the icon as child of first available iconContainer
        itemIconContainers[i].isEmpty = false; //change slot to not empty

        scene.inventoryContainer.itemIcons.push(item);
        scene.inventoryContainer.containerSprites.push(item);
        scene.inventoryContainer.sprites.push(itemIcon.sprite);
        //  console.log(itemIcon);

        return;

      }
    }
  }
  }


  removeItem(scene, item) { //scene refers to OverlayScene and item refers to the ItemIcon

  // find the index of the item in this.items, if it doesn't exist, existingItemIndex will be equal to -1
    const existingItemIndex = this.items.findIndex(existingItem => existingItem.name === item.sprite.name);
    const existingIconIndex = scene.inventoryContainer.itemIcons.findIndex(existingIcon => existingIcon.name === item.sprite.name);
    const existingSpriteIndex = scene.inventoryContainer.sprites.findIndex(existingSprite => existingSprite.name === item.sprite.name);
   
    console.log(`BEGINNING OF THE ITEM REMOVAL PROCESS DAMNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
   START SLICINGGGG AND DICINGGGGGGGG HERES THE BEGINNING OF THE PROCESS LOGGING BEFORE THE SLICES
   SO I HOPE THIS REALLY WORKS`);
    console.log(`HEY YALL ITS THE EXISTING SPRITE INDEX`);
    console.log(existingSpriteIndex);
    console.log(`HEY YALL ITS THE CURRENT SPRITE THATS TRYING TO BE REMOVED. ie. inventoryContainers.sprites[existingSpriteIndex]`);
    console.log(scene.inventoryContainer.sprites[existingSpriteIndex]);
    console.log(`HEY YALL ITS inventoryContainers.sprites ARRAY`);
    console.log(scene.inventoryContainer.sprites);
    

 // checks if the item is already in this.items, AND if the item is stackable, AND if there's more of one of the item
 if (existingItemIndex !== -1 && item.sprite.stackable && this.items[existingItemIndex].quantity > 1) {  
    //this.items[existingItemIndex].quantity += item.quantity; //make it later so can add multiple items at once without having to call multiple times
      
   //while the condition remains true, decrease the item's quantity and the itemCount of the ItemIcon text by 1 each time removeItem is called
      this.items[existingItemIndex].quantity--; //currently increases the quantity by 1 for each time called
      item.sprite.quantity--;
      item.sprite.itemQuant.setText(this.items[existingItemIndex].quantity);
    } 
   
   // checks if the item is already in this.items, AND if the item is stackable, AND if there's only one of the item
  else if (existingItemIndex !== -1 && item.sprite.stackable && this.items[existingItemIndex].quantity === 1) {

    const itemIconContainers = scene.inventoryContainer.itemIconContainers;

   //if the item was the last item, remove it from it from this.items
   this.items.splice(existingItemIndex, 1);

   scene.inventoryContainer.itemIcons.splice(existingIconIndex, 1);
   scene.inventoryContainer.sprites.splice(existingSpriteIndex, 1);

       console.log(`HEY YALL ITS THE EXISTING SPRITE INDEX POST SLICE`);
    console.log(existingSpriteIndex);
    console.log(`HEY YALL ITS THE CURRENT SPRITE THATS TRYING TO BE REMOVED POST SLICE. ie. inventoryContainers.sprites[existingSpriteIndex]`);
    console.log(scene.inventoryContainer.sprites[existingSpriteIndex]);
    console.log(`HEY YALL ITS inventoryContainers.sprites ARRAY POST SLICE`);
    console.log(scene.inventoryContainer.sprites);
   

    //after removing from this.items, also destroy the itemIcon
    itemIconContainers.forEach((container) => {
      if (container.list.length !== 0) {
      let firstContainer = container.getAll().find(child => child instanceof Phaser.GameObjects.Container);

         if (firstContainer.sprite.textureKey === item.sprite.textureKey) { //later switch with container.first.texture or .textureKey
           firstContainer.destroy();
           container.isEmpty = true;  
        }
      }  
    });
    }
    
  //if the item is not stackable, then just remove the item from this.items and destroy the itemIcon of the container clicked 
 else {
   console.log('this must be a non stackable item');
   console.log(item);
   item.parentContainer.isEmpty = true;
   this.items.splice(existingItemIndex, 1);
   item.destroy();
  }

  //rechecks this.items after the removals
  console.log('THIS IS THE NEW PRINTING OF THIS.ITEMS');
  console.log(this.items);
  }


  displayFullInventory() {
    console.log('Inventory:');
    this.items.forEach(item => {
      console.log(item);
    });
  }

  createInventoryContainer(scene) {
    console.log('call the import funct w/ method of same name');
    createInventoryContainer(scene);
    //createInventoryZones(scene);
    createItemSlots(scene);
  }


  getRelativePos(object, parentContainer) {
    let x = object.x;
    let y = object.y;
    let currentContainer = object.parentContainer;

    // Traverse up the hierarchy until the specified parentContainer is reached
    while (currentContainer && currentContainer !== parentContainer) {
      x -= currentContainer.x;
      y -= currentContainer.y;
      currentContainer = currentContainer.parentContainer;
    }

    // If the specified parentContainer is found, return the relative position
    if (currentContainer === parentContainer) {
      return { x, y };
    } else {
      // If the specified parentContainer is not found, return null or handle the error accordingly
      return null;
    }
  }



  setDragEvents(itemIcon, scene) {

    let dragXTotal = 0;
    let dragYTotal = 0;
    //  console.log(`set drag events being called;`);
    this.itemDragStart(itemIcon, scene);
    this.itemDragEnd(itemIcon, scene);
    this.itemDrag(itemIcon, scene);

  }


  itemDrag(itemIcon, scene) {

    itemIcon.on('drag', function (pointer, dragX, dragY) {
      //   console.log('drag');
      if (scene.inventoryContainer.allowDrag) {
        this.setAlpha(.5);
        this.x = dragX;
        this.y = dragY;
      } else {
        console.log(`cant drag now, resetting allowDrag to true`);
        scene.inventoryContainer.allowDrag = true;
        //return false;
      }
    });
  }


  itemDragStart(itemIcon, scene) {

    itemIcon.on('dragstart', function (pointer, dragX, dragY) {
      console.log('dragStart');
      this.setAlpha(0.5);
      let lastClickTime = 0;
      let doubleClickDelay = 4000;
      scene.inventoryContainer.allowDrag = true;

      scene.inventoryContainer.dragStartTime = this.scene.time.now; //deleted this by try isntead?
      let lastDragEndTime = scene.inventoryContainer.lastDragEndTime;
      let timeSinceLastDrag = scene.inventoryContainer.dragStartTime - lastDragEndTime;
      console.log('REAL time since last drag should be: ' + timeSinceLastDrag);

      if (timeSinceLastDrag < 100) { //also make sure its dropped on same container
        console.log(`Double Clicked on item`);
        //event.stopImmediatePropagation();
        console.log(itemIcon);
        // pointer.stopImmediatePropagation();
        //  pointer.stopPropagation();
        scene.inventoryContainer.allowDrag = false;
        if (!itemIcon.contextMenu) {
          console.log('startmakingcontextmenu');
          // Create context menu if it doesn't exist
          itemIcon.contextMenu = new itemContextMenu(scene, pointer.x, pointer.y, itemIcon);
          itemIcon.contextMenu.setPosition(pointer.x, pointer.y);
          itemIcon.contextMenu.setVisible(true);
          //itemIcon.contextMenu = true;
        } else {
          // Update context menu position
          itemIcon.contextMenu.setPosition(pointer.x, pointer.y);
          itemIcon.contextMenu.setVisible(true);
        }
        return false;
      }

      // console.log(pointer);
      // console.log(scene.inventoryContainer.dragStartTime);


      scene.inventoryContainer.dragStartX = itemIcon.getBounds().x;
      scene.inventoryContainer.dragStartY = itemIcon.getBounds().y;
      scene.inventoryContainer.startSpriteState = itemIcon;
      //  console.log(itemIcon.getBounds());
      // console.log(itemIcon);

      scene.inventoryContainer.dragStartParent = itemIcon.parentContainer;
      //  console.log(scene.inventoryContainer.dragStartParent);
      //  console.log(scene.inventoryContainer.dragStartParent.getBounds());
      // itemIcon.parentContainer.parentContainer.remove(itemIcon.parentContainer);
      // itemIcon.parentContainer.parentContainer.remove(itemIcon.parentContainer);
      //console.log(itemIcon);

      // scene.inventoryContainer.itemIconContainers[6].add(itemIcon);


    });
  }

  itemDragEnd(itemIcon, scene) {

    itemIcon.on('dragend', function (pointer, dragX, dragY) {
      // console.log('dragEnd');
      //  console.log(pointer);

      let prevTime = scene.inventoryContainer.dragStartTime;
      scene.inventoryContainer.lastDragEndTime = this.scene.time.now;
      let dragDur = scene.inventoryContainer.lastDragEndTime - prevTime;
      console.log('dragend: drag duration should be: ' + dragDur);


      /*
            //also add check to make sure it was dropped in same container it started
            if (dragDur < 500 && scene.inventoryContainer.quickClicks === 0) {
              console.log('dragEnd DoubleClick listen, first click');
              scene.inventoryContainer.quickClicks = 1;
            } else {
              console.log('too slow for doubleclick, first click');
            }
      
            if (dragDur > 500) {
              scene.inventoryContainer.quickClicks = 0;
            }
      
            if (dragDur < 500 && scene.inventoryContainer.quickClicks === 1) {
              console.log('dragEnd DoubleClick listen, second click');
             // scene.inventoryContainer.quickClicks = 0;
            } else {
              console.log('too slow for doubleclick, second click');
            }
      */




      this.setAlpha(1);

      const itemIconContainers = scene.inventoryContainer.itemIconContainers;
      const itemParent = itemIcon.parentContainer;

      let isValidDropZone = Phaser.Geom.Rectangle.Overlaps(scene.inventoryContainer.getBounds(), itemIcon.getBounds());

      if (isValidDropZone) {

        // The draggable item is overlapping with the drop target
        //  console.log("Dragged onto drop target");


        let maxOverlap = 0;
        let bestDropZoneIndex = -1;
        let slotID = 0;

        for (let i = 0; i < scene.inventoryContainer.itemSlotContainers.length; i++) {
          let dropZone = scene.inventoryContainer.itemSlotContainers[i];
          let overlapArea = Phaser.Geom.Rectangle.Intersection(dropZone.getBounds(), itemIcon.getBounds()).width * Phaser.Geom.Rectangle.Intersection(dropZone.getBounds(), itemIcon.getBounds()).height;

          if (overlapArea > maxOverlap) {
            maxOverlap = overlapArea;
            bestDropZoneIndex = i;
            slotID = i + 1;
          }
        }

        if (bestDropZoneIndex !== -1) {
          //  console.log(`Dropped in Zone ${bestDropZoneIndex}, slot number: ${bestDropZoneIndex + 1}`);
          if (itemIconContainers[bestDropZoneIndex].isEmpty === true) {
            //   console.log(`add icon to new empty slot and switch parent container`);
            itemIconContainers[bestDropZoneIndex].isEmpty = false;
            itemIconContainers[bestDropZoneIndex].add(itemIcon);
            itemParent.isEmpty = true;
            //    console.log(itemIcon);
            const endXY = scene.inventory.getRelativePos(itemIcon, scene);
            itemIcon.setPosition(endXY);
          } else {
            console.log(`swap icon spots`);
            //console.log(itemIconContainers[bestDropZoneIndex].first);
            let otherSprite = itemIconContainers[bestDropZoneIndex].getAll().find(child => child instanceof Phaser.GameObjects.Container);
           // const otherIcon = itemIconContainers[bestDropZoneIndex].first;
            itemParent.add(otherSprite);
            itemIconContainers[bestDropZoneIndex].add(itemIcon);
            const endXY = scene.inventory.getRelativePos(itemIcon, scene);
            itemIcon.setPosition(endXY);
            const endXYotherIcon = scene.inventory.getRelativePos(otherSprite, scene);
            otherSprite.setPosition(endXYotherIcon);

          }
        } else {
          console.log("No drop zone detected == Too little of sprite in dropZone");
          const startX = scene.inventoryContainer.dragStartX;
          const startY = scene.inventoryContainer.dragStartY;

          //  console.log(itemIcon);
          const endXY = scene.inventory.getRelativePos({ x: startX, y: startY }, scene);
          itemIcon.setPosition(endXY);
        }


      }

      else {
        const startX = scene.inventoryContainer.dragStartX;
        const startY = scene.inventoryContainer.dragStartY;

        //  console.log(itemIcon);
        const endXY = scene.inventory.getRelativePos({ x: startX, y: startY }, scene);
        itemIcon.setPosition(endXY);

        /*
        const tween = scene.tweens.add({
          targets: itemIcon,
          x: endXY.x,
          y: endXY.y,
          ease: 'Power2', // Adjust easing for desired movement
          duration: 300, // Adjust duration for animation speed
      });
       */
      }


    });
  }


}