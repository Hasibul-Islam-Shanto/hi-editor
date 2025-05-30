import { Trash2Icon, UserIcon } from 'lucide-react';
import { Id } from '../../../../../convex/_generated/dataModel';
import CommentContent from './CommentContent';

interface CommentProps {
  comment: {
    _id: Id<'snippetComments'>;
    _creationTime: number;
    userId: string;
    userName: string;
    snippetId: Id<'snippets'>;
    content: string;
  };
  onDelete: (commentId: Id<'snippetComments'>) => void;
  isDeleting: boolean;
  currentUserId?: string;
}

const Comment = ({
  comment,
  currentUserId,
  isDeleting,
  onDelete,
}: CommentProps) => {
  return (
    <>
      {' '}
      <div className="group">
        <div className="rounded-xl border border-[#ffffff0a] bg-[#0a0a0f] p-6 transition-all hover:border-[#ffffff14]">
          <div className="mb-4 flex items-start justify-between gap-4 sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#ffffff08]">
                <UserIcon className="h-4 w-4 text-[#808086]" />
              </div>
              <div className="min-w-0">
                <span className="block truncate font-medium text-[#e1e1e3]">
                  {comment.userName}
                </span>
                <span className="block text-sm text-[#808086]">
                  {new Date(comment._creationTime).toLocaleDateString()}
                </span>
              </div>
            </div>

            {comment.userId === currentUserId && (
              <button
                onClick={() => onDelete(comment._id)}
                disabled={isDeleting}
                className="rounded-lg p-2 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-500/10"
                title="Delete comment"
              >
                <Trash2Icon className="h-4 w-4 text-red-400" />
              </button>
            )}
          </div>

          <CommentContent content={comment.content} />
        </div>
      </div>
    </>
  );
};

export default Comment;
