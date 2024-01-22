
import Layout from '@/app/components/layout';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
const getBlogPostBySlug = async (username, slug) => {

  const demoData = [
    {
      username: 'john_doe',
      slug: 'first-post',
      profileimage: "https://plus.unsplash.com/premium_photo-1673356713504-d8a6a35eb209?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      fullname: 'Abhishek Temgire',
      createdDate: "Just now",
      title: 'Hey haole! If you’ve taken a trip to Maui, you need to give back',
      content: `<p id="9458" class="pw-post-body-paragraph xa xb qz xc b rs xd xe xf rv xg xh xi lk xj xk xl lo xm xn xo ls xp xq xr xs qt cb" data-selectable-paragraph="">I’ll spare you the usual details of that awful morning. They have been well-documented and you have likely seen enough video of the event to last a lifetime. I was working at a hospital less than half a mile from the World Trade Center where, from my office, I had a clear view of the buildings and even had to tilt my head back to see their tops. A colleague and I were in my office pondering the incident in the first building when we witnessed the second plane disappear into the south tower.</p>`,
    },
    {
      username: 'jane_smith',
      slug: 'second-post',
      title: 'Second Blog Post',
      fullname: 'Abhishek Temgire',
      content: `
        <article>
          <h1>${'Second Blog Post'}</h1>
          <img src="https://example.com/second-post-image.jpg" alt="Second Post Image">
          <p>By <strong>${'Jane Smith'}</strong></p>
          <p>Date: ${'September 14, 2023'}</p>
          <p>Category: ${'Technology'}</p>
          <p>This is the content of the second post. Sed euismod, urna non condimentum posuere, est erat scelerisque metus, vel lacinia tortor quam eget nulla.</p>
        </article>
      `,
    },
  ];

  // You can now use this demoData array to display the blog posts in your application.

  const post = demoData.find(
    (post) => post.username === username && post.slug === slug
  );

  return post ? { ...post } : null;
};

function BlogPostDetail({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Blog post not found</div>;
  }

  

  return (
    <Layout>
      <div className="text-white justify-center items-center flex h-screen w-[100%]">
        <div className="text-[#1e1e1e] items-center flex flex-col h-screen w-[100%]">
          <div className="max-w-[700px] text-[#1e1e1e] items-center flex flex-col h-screen w-[100%]">
            <h1 className='text-3xl font-extrabold'>{post.title}</h1>
            <div className="justify-start items-start flex">
              <div className="relative flex flex-row items-center gap-x-1">
                <img
                  src={post.profileimage}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover object-center bg-gray-50"
                />
                <div className="flex flex-row justify-center items-center">
                  <p className="flex flex-col text-gray-900">
                    <a className="font-medium text-sm">
                      <span className="absolute " />
                      {post.fullname}
                    </a>
                    <a className="font-medium flex flex-row w-[100%] text-xs">
                      <p className='font-semibold'>Posted: </p>
                      {post.createdDate}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="content-preview" id="content-preview">
            {parse(post.content)}
      </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export async function getStaticPaths() {
  const demoData = [
    {
      username: 'john_doe',
      slug: 'first-post',
      title: 'First Blog Post',
      content: '<p>This is the content of the first post.</p>',
    },
    {
      username: 'jane_smith',
      slug: 'second-post',
      title: 'Second Blog Post',
      content: '<p>This is the content of the second post.</p>',
    },
  ];

  const paths = demoData.map((post) => ({
    params: { username: post.username, slug: post.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  // Fetch the blog post data by slug from your database or API
  const { username, slug } = params;
  const post = await getBlogPostBySlug(username, slug);

  return {
    props: {
      post,
    },
  };
}

export default BlogPostDetail;
