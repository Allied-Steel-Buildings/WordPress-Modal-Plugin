# WORDPRESS MODAL PLUGIN    

Turn any page or post into a modal (pop-up)!

Any page, post, or other post type be loaded into this easy-to-use modal. Additionally, external web pages can be loaded in this modal window too.

Note that headers, footers, and sidebars are not included in the modal window.

### SETUP INSTRUCTIONS    

1. Upload `wp-post-modal.zip` to the `/wp-content/plugins/` directory and extract.
2. Activate the plugin through the "Plugins" menu in WordPress.
3. Add the class `modal-link` to open the href of that link into a modal window.
4. If you want to show an external page in the modal, add the attribute `data-div="#id"` to your `.modal-link` where the ```<strong>id</strong>``` is the container on the target external page that you would like to display inside the modal.    

**NOTE: A page can have multiple modal links.**

### EXAMPLE    

Create a link with the class `modal-link`:

```
<a class="modal-link" href="http://example.com/terms/>Terms and Conditions</a>
```
**NOTE: The href must be pointing to the SLUG for the post/page, not the full URL.**    

### REQUIREMENTS    
Minimum WordPress: v3.0    
Tested up to: v4.8.2


About Allied
----------------

![Allied](https://github.com/Allied-Steel-Buildings/WordPress-Modal-Plugin/blob/master/assets/ASB-Logo-Compressed.jpg?raw=true)

[Allied][allied] is a global leader in steel construction, developing solutions for every industry. From aviation to warehouses and everything in between, trust [Allied][allied] to be with you all the way.    

The names and logos for Allied are trademarks of [Allied Steel Buildings, Inc.][allied]  We love open source software. :octocat:

[allied]: http://alliedbuildings.com/
