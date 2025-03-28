# Task 1: Convert to Server Components

## Objective
Convert the products page from using client-side fetching to using server components. This will improve performance and reduce client-side JavaScript.

## Current Implementation
The current implementation in `app/products/page.tsx` uses:
- Client-side data fetching with `useEffect`
- Client-side state management with `useState`
- Client-side cart management
- Client-side pagination

## Requirements
1. Remove the 'use client' directive
2. Convert the page to a server component
3. Move data fetching to the server
4. Keep the cart functionality client-side (since it needs interactivity)
5. Use proper loading states with Next.js 13+ patterns

## Steps
1. Create a new server component for the products list
2. Move the data fetching logic to the server
3. Create a client component for the cart functionality
4. Update the pagination to work with server components
5. Implement proper loading states using Next.js 13+ patterns

## Expected Outcome
- Faster initial page load
- Better SEO
- Reduced client-side JavaScript
- Maintained functionality with better architecture

## Tips
- Use `async` components for server-side data fetching
- Keep interactive parts in client components
- Use Next.js 13+ loading.tsx for loading states
- Consider using React Suspense boundaries 