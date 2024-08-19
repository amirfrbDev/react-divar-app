import React from 'react'
import AllPosts from 'src/components/templates/AdminAllPosts'
import CategoryForm from 'src/components/templates/CategoryForm'
import CategoryList from 'src/components/templates/CategoryList'

function AdminPage() {
  return (
    <div>
      <CategoryList />
      <CategoryForm />
      <hr />
      <AllPosts />
    </div>
  )
}

export default AdminPage