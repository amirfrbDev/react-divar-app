import React from 'react'
import AddPost from 'components/templates/AddPost'
import PostsList from 'src/components/templates/PostsList'

function DashboardPage() {
  return (
    <div>
      <AddPost />
      <PostsList />
    </div>
  )
}

export default DashboardPage