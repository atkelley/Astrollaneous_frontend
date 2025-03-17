import { useState } from "react";

export default function CommentModal () {
  const [state, setState] = useState({ commentId: 0, commentText: "" });

  const handleCommentSubmit = () => {}
  
  return (
    <div className="modal fade bd-example-modal-lg" id='commentModal' tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={handleCommentSubmit}>
            <div className="modal-header">
              {(state.commentId < 0) ? <h2 className="modal-title">Add Comment</h2> : <h2 className="modal-title">Edit Comment</h2>}
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>

            <div className="modal-body">
              <textarea 
                type="text" 
                name="text" 
                placeholder="Enter Text..." 
                rows={10}
                className="form-control validate input" 
                onChange={(event) => setState(event.target.value)}
                value={state.commentText}
                required
              />
            </div>

            <div className="modal-footer">
              {(state.commentId < 0) ? 
                <button type="submit" className="btn btn-primary">Add Comment</button>
              : 
                <button type="submit" className="btn btn-primary">Edit Comment</button>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}