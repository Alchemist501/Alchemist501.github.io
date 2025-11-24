import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getBlogBySlug, BlogPost as BlogPostType } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";

const BlogPost = () => {
    const { theme } = useTheme();
    const { slug } = useParams<{ slug: string }>();
    const [blog, setBlog] = useState<BlogPostType | null>(null);
    const location = useLocation();
    const isProfessional = location.pathname.startsWith("/professional");

    useEffect(() => {
        if (slug) {
            getBlogBySlug(slug).then(setBlog);
        }
    }, [slug]);

    if (!blog) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className={`min-h-screen py-20 px-4 md:px-8 ${theme === 'dark' ? 'bg-background text-foreground font-mono' : 'bg-white text-gray-900 font-sans'}`}>
            <article className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <Link
                        to={isProfessional ? "/professional/blog" : "/blog"}
                        className={`inline-flex items-center transition-colors ${theme === 'dark' ? 'text-muted-foreground hover:text-primary' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blogs
                    </Link>
                    <Link
                        to={isProfessional ? "/professional" : "/"}
                        className={`inline-flex items-center transition-colors ${theme === 'dark' ? 'text-muted-foreground hover:text-primary' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                    </Link>
                    <ThemeToggle />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className={`text-3xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-primary glow-green' : 'text-gray-900'}`}>
                        {blog.title}
                    </h1>

                    <div className={`flex flex-wrap items-center gap-6 mb-8 pb-8 border-b ${theme === 'dark' ? 'text-muted-foreground border-primary/30' : 'text-gray-600 border-gray-200'}`}>
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(blog.date).toLocaleDateString()}
                        </span>
                        <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4" />
                            <div className="flex gap-2">
                                {blog.tags?.map((tag) => (
                                    <span key={tag} className={theme === 'dark' ? 'text-accent' : 'text-gray-700 font-medium'}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {blog.coverImage && (
                        <div className={`mb-10 rounded-xl overflow-hidden border ${theme === 'dark' ? 'border-primary/30' : 'border-gray-200 shadow-lg'}`}>
                            <img
                                src={blog.headerImage || blog.coverImage}
                                alt={blog.title}
                                className="w-full h-auto"
                            />
                        </div>
                    )}

                    <div className={`prose prose-lg max-w-none ${theme === 'dark'
                        ? 'prose-invert prose-headings:text-primary prose-a:text-accent prose-strong:text-primary prose-code:text-accent'
                        : 'prose-headings:text-gray-900 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:text-gray-800'
                        }`}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
                    </div>
                </motion.div>
            </article>
        </div>
    );
};

export default BlogPost;
