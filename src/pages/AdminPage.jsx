import AllPosts from '@/components/templates/AdminAllPosts'
import CategoryForm from '@/components/templates/CategoryForm'
import CategoryList from '@/components/templates/CategoryList'

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