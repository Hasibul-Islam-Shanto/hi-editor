import React, { useState } from 'react';
import { Id } from '../../../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { useQuery } from 'convex/react';
import toast from 'react-hot-toast';
import { SignInButton, useUser } from '@clerk/nextjs';
import { api } from '../../../../../convex/_generated/api';
import { MessageSquare } from 'lucide-react';
import CommentForm from './CommentForm';
import Comment from './Comment';

const Comments = ({ snippetId }: { snippetId: Id<'snippets'> }) => {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletinCommentId, setDeletingCommentId] = useState<string | null>(
    null,
  );

  const comments = useQuery(api.snippets.getComments, { snippetId }) || [];
  const addComment = useMutation(api.snippets.addComment);
  const deleteComment = useMutation(api.snippets.deleteComment);

  const handleSubmitComment = async (content: string) => {
    setIsSubmitting(true);

    try {
      await addComment({ snippetId, content });
    } catch (error) {
      console.log('Error adding comment:', error);
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: Id<'snippetComments'>) => {
    setDeletingCommentId(commentId);

    try {
      await deleteComment({ commentId });
    } catch (error) {
      console.log('Error deleting comment:', error);
      toast.error('Something went wrong');
    } finally {
      setDeletingCommentId(null);
    }
  };
  return (
    <>
      {' '}
      <div className="overflow-hidden rounded-2xl border border-[#ffffff0a] bg-[#121218]">
        <div className="border-b border-[#ffffff0a] px-6 py-6 sm:px-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
            <MessageSquare className="h-5 w-5" />
            Discussion ({comments.length})
          </h2>
        </div>

        <div className="p-6 sm:p-8">
          {user ? (
            <CommentForm
              onSubmit={handleSubmitComment}
              isSubmitting={isSubmitting}
            />
          ) : (
            <div className="mb-8 rounded-xl border border-[#ffffff0a] bg-[#0a0a0f] p-6 text-center">
              <p className="mb-4 text-[#808086]">
                Sign in to join the discussion
              </p>
              <SignInButton mode="modal">
                <button className="rounded-lg bg-[#3b82f6] px-6 py-2 text-white transition-colors hover:bg-[#2563eb]">
                  Sign In
                </button>
              </SignInButton>
            </div>
          )}

          <div className="space-y-6">
            {comments.map(comment => (
              <Comment
                key={comment._id}
                comment={comment}
                onDelete={handleDeleteComment}
                isDeleting={deletinCommentId === comment._id}
                currentUserId={user?.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
