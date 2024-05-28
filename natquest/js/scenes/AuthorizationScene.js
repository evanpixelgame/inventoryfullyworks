// Define Authorization Scene
import OpenWorld from './scenes/OpenWorld.js';

document.addEventListener('DOMContentLoaded', () => {
export default class AuthorizationScene extends Phaser.Scene {
    constructor() {
      super({ key: 'AuthorizationScene' });
    }
  
    create() {
      // Implement UI and logic for authorization process
      // Example: input fields, login button, authentication logic
    }
  
    // Method to handle authentication result
    handleAuthenticationResult(success) {
      if (success) {
        this.scene.launch('Preloader'); // Resume main scene
       // this.scene.remove('AuthorizationScene'); // should this be removed?
      } else {
        // Handle failed authentication (e.g., display error message)
      }
    }
  }


});