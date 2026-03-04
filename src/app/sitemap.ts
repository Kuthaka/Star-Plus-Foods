import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { STATIC_BLOGS } from '@/data/blogs'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.starplusfoods.com'
    const supabase = await createClient()

    // 1. Fetch Products
    const { data: products } = await supabase
        .from('products')
        .select('slug, updated_at')
        .eq('is_listed', true)

    // 2. Map Products to Sitemap entries
    const productEntries = (products || []).map((product) => ({
        url: `${baseUrl}/shop/${product.slug}`,
        lastModified: new Date(product.updated_at || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // 3. Map Static Blogs to Sitemap entries
    const blogEntries = STATIC_BLOGS.map((blog) => ({
        url: `${baseUrl}/blogs/${blog.slug}`,
        lastModified: new Date(blog.created_at),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // 4. Static Pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/shop`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
    ]

    return [...staticPages, ...productEntries, ...blogEntries]
}
