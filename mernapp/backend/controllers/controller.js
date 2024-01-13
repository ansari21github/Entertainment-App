
const Bookmark = require('../models/Bookmark');

module.exports.getBookmarks = async (req, res) => {
  try {
    const { email } = req.params;
    const bookmark = await Bookmark.findOne({ email });

    if (bookmark) {
      return res.json({ msg: "success", bookmarks: bookmark.bookmarks });
    } else {
      return res.json({ msg: "User with given email not found." });
    }
  } catch (error) {
    return res.json({ msg: "Error fetching bookmarks." });
  }
};

module.exports.addToBookmarks = async (req, res) => {
  try {
    const { email, data } = req.body;

    let bookmark = await Bookmark.findOne({ email });

    // Log the Bookmark ID and Data
    console.log('Bookmark ID:', bookmark ? bookmark._id : 'Not found');
    console.log('Data:', data);

    if (bookmark) {
      const { bookmarks } = bookmark;
      const alreadyBookmarked = bookmarks.find(
        ({ _id }) => _id && _id.toString() === data._id
      );

      if (!alreadyBookmarked) {
        await Bookmark.updateOne(
          { email },
          { $push: { bookmarks: data } }
        );
        bookmark = await Bookmark.findOne({ email });
      } else {
        return res.json({ msg: 'Already added to the bookmarked list.' });
      }
    } else {
      bookmark = await Bookmark.create({ email, bookmarks: [data] });
    }

    // Log the updated Bookmark ID and Data
    console.log('Updated Bookmark ID:', bookmark ? bookmark._id : 'Not found');
    console.log('Updated Data:', bookmark ? bookmark.bookmarks : 'Not found');

    return res.json({
      msg: 'Successfully added to bookmarked list.',
      bookmarks: bookmark.bookmarks,
    });
  } catch (error) {
    console.error('Error adding to bookmarks:', error);
    return res.json({
      msg: 'Error adding to the bookmarked list',
    });
  }
};


module.exports.removeFromBookmarks = async (req, res) => {
  try {
    const { email, data } = req.body;
    const bookmark = await Bookmark.findOne({ email });

    if (bookmark) {
      const { bookmarks } = bookmark;

      // Ensure bookmarks array is defined and not empty
      if (bookmarks && Array.isArray(bookmarks) && bookmarks.length > 0) {
        // Log the current Bookmark ID and Bookmarks array
        console.log('Current Bookmark ID:', bookmark._id);
        console.log('Current Bookmarks:', bookmarks);

        // Find the index of the bookmark with the provided data._id
        const bookmarkIndex = bookmarks.findIndex(({ item }) => item._id.toString() === data._id);

        // Check if the bookmark with the provided data._id exists
        if (bookmarkIndex !== -1) {
          // Remove the bookmark from the bookmarks array
          bookmarks.splice(bookmarkIndex, 1);

          // Update the bookmarks array in the database
          const updatedBookmark = await Bookmark.findOneAndUpdate(
            { email },
            { $set: { bookmarks } },
            { new: true }
          );

          // Log the updated Bookmark ID and Data
          console.log('Updated Bookmark ID:', updatedBookmark ? updatedBookmark._id : 'Not found');
          console.log('Updated Bookmarks:', updatedBookmark ? updatedBookmark.bookmarks : 'Not found');

          return res.json({ msg: 'Successfully removed.', bookmarks });
        } else {
          return res.status(404).json({ msg: 'Item not found in bookmarks for data._id: ' + data._id });
        }
      } else {
        return res.status(500).json({ msg: 'Bookmarks array is undefined, not an array, or empty.' });
      }
    } else {
      return res.status(404).json({ msg: 'Bookmark not found for email: ' + email });
    }
  } catch (error) {
    console.error('Error removing from bookmarks:', error);
    return res.status(500).json({ msg: 'Error removing from the bookmarked list' });
  }
};
