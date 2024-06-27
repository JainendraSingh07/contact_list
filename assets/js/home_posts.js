$(document).ready(function() {
    // Method to submit the form data for a new post using AJAX
    let createPost = function() {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/message/posts/create',
                data: newPostForm.serialize(),
                success: function(data) {
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($('.delete-post-button', newPost));
                },
                error: function(error) { 
                    console.log(error.responseText);
                }
            });
        });
    };

    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
    <p>
        <small>
            <a class="delete-post-button" href="/message/posts/destroy/${post._id}" aria-label="Delete Post">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
            </a>
        </small>
        ${post.content}
        <br>
        <small>
            ${post.user.username}
        </small>
    </p>
    <div class="post-comments">
        <form action="/message/comments/create" method="POST">
            <input type="text" name="content" placeholder="Type Here to add comment..." required>
            <input type="hidden" name="post" value="${post._id}">
            <input type="submit" value="Add Comment">
        </form>
        <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
            </ul>
        </div>
    </div>
</li>`);
    };

    // Method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.post_id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    };

    // Initialize the createPost function
    createPost();
});
