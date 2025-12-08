import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getBlogs, BlogPost } from "@/lib/blog";
import { Link, useLocation, useParams } from "react-router-dom";
import { Calendar, ChevronRight, ArrowLeft } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";

const BlogSeries = () => {
    const { theme } = useTheme();
    const { series } = useParams<{ series: string }>();
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const location = useLocation();
    const isProfessional = location.pathname.startsWith("/professional");

    // Helper to decode URL-friendly series name back to original
    const decodeSeriesName = (slug: string) => {
        return decodeURIComponent(slug);
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            const allBlogs = await getBlogs();
            const seriesName = decodeSeriesName(series || "");
            const filteredBlogs = allBlogs.filter(blog => blog.series === seriesName);
            setBlogs(filteredBlogs);
        };
        fetchBlogs();
    }, [series]);

    return (
        <div className={`min-h-screen py-20 px-4 md:px-8 ${theme === 'dark' ? 'bg-background text-foreground font-mono' : 'bg-gray-50 text-gray-900 font-sans'}`}>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <Link to={isProfessional ? "/professional/blog" : "/blog"} className={`inline-flex items-center transition-colors ${theme === 'dark' ? 'text-primary hover:text-accent' : 'text-gray-600 hover:text-gray-900'}`}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Series
                    </Link>
                    <ThemeToggle />
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-3xl md:text-4xl font-bold mb-12 text-center ${theme === 'dark' ? 'glow-green' : 'text-gray-900'}`}
                >
                    {decodeSeriesName(series || "")}
                </motion.h1>

                <div className="grid gap-8">
                    {blogs.length > 0 ? (
                        blogs.map((blog, index) => (
                            <motion.div
                                key={blog.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`${theme === 'dark'
                                    ? 'bg-card border border-primary/30 hover:border-primary'
                                    : 'bg-white border border-gray-200 shadow-sm hover:shadow-md'
                                    } rounded-lg overflow-hidden transition-all group`}
                            >
                                <Link to={isProfessional ? `/professional/blog/${blog.slug}` : `/blog/${blog.slug}`} className="block p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row items-center gap-6">
                                        {blog.coverImage && (
                                            <div className="w-full md:w-1/3 rounded-lg overflow-hidden bg-muted">
                                                <img
                                                    src={blog.coverImage}
                                                    alt={blog.title}
                                                    className="w-full h-auto object-contain transition-transform group-hover:scale-105"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(blog.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h2 className={`text-2xl font-bold mb-3 transition-colors ${theme === 'dark' ? 'text-primary group-hover:text-accent' : 'text-gray-900 group-hover:text-gray-600'
                                                }`}>
                                                {blog.title}
                                            </h2>
                                            <p className="text-muted-foreground mb-4 line-clamp-3">
                                                {blog.excerpt}
                                            </p>
                                            <div className={`flex items-center font-semibold group-hover:translate-x-2 transition-transform ${theme === 'dark' ? 'text-primary' : 'text-gray-900'
                                                }`}>
                                                Read Article <ChevronRight className="w-4 h-4 ml-1" />
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {blog.tags?.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className={`px-2 py-1 text-xs rounded-full border ${theme === 'dark'
                                                            ? 'bg-primary/10 text-primary border-primary/30'
                                                            : 'bg-gray-100 text-gray-700 border-gray-200'
                                                            }`}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            No posts found in this series.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogSeries;
