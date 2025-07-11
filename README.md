# 🎓 Course Page Component (Prototype)

> **⚠️ This is a prototype/demo version** - Not intended for production use

A modern course discovery interface built with Next.js, TypeScript, and Tailwind CSS. This prototype demonstrates course filtering, search functionality, and payment integration concepts.

## ✨ Features

- 🔍 **Real-time Search** - Search across course titles and descriptions
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- 🎯 **Smart Filtering** - Filter by category, level, and price
- ❤️ **Wishlist System** - Save courses for later
- 💳 **Payment Demo** - Simulated payment flow (UPI/Cards)
- 🎨 **Modern UI** - Clean interface with Tailwind CSS

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+
- Next.js 13+ (App Router)
- TypeScript

### Installation
```bash
# Clone and install
git clone <repository-url>
cd course-page
npm install

# Run development server
npm run dev
```

## 🎯 Component Architecture

The course page is built using modular components with separated concerns:

```typescript
// Multiple focused hooks instead of one large hook
const { searchQuery, filteredCourses, clearAllFilters } = useCourseFilters(courses)
const { wishlist, toggleWishlist } = useWishlist()
const { paymentModal, openPaymentModal, closePaymentModal } = usePaymentModal()
const { handleEnrollClick, handleShareClick } = useCourseActions({
  courses, teachers, onEnroll: openPaymentModal, onWishlistToggle: toggleWishlist
})
```

## 🧩 Components

### CourseHeader
Search bar and filter controls

### CourseGrid  
Displays filtered course cards with actions

### TeachersSection
Showcases featured teachers

### CategoriesSection
Category-based navigation

## 💳 Payment Integration (Demo)

- **Mock Payment Flow** - Simulates real payment process
- **UPI Integration** - Demo UPI providers (Google Pay, PhonePe, etc.)
- **Form Validation** - Real-time validation with error handling
- **Success/Error States** - Complete user feedback flow

> **Note**: Payment integration is for demonstration only and uses simulated responses.

## 🎨 Styling

- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Pre-built components
- **Responsive Design** - Mobile-first approach
- **Clean UI** - Modern, minimal interface

## 🔧 Customization

### Adding New Filters
```typescript
// Update constants
export const NEW_FILTER_OPTIONS = ["Option 1", "Option 2"]

// Add to useCourseFilters hook
const [newFilter, setNewFilter] = useState("All")

// Update filtering logic
const filteredCourses = useMemo(() => {
  return courses.filter(course => 
    // existing filters...
    && (newFilter === "All" || course.newProperty === newFilter)
  )
}, [courses, searchQuery, newFilter])
```

### Modifying Sample Data
```typescript
// Update constants/courseData.ts
export const courses = [
  {
    id: "new-course",
    title: "Your Course Title",
    // ... other properties
  }
]
```

## ⚠️ Limitations (Prototype)

- **No Backend** - Uses static sample data
- **No Persistence** - Data resets on page refresh
- **Mock Payments** - Simulated payment processing
- **Limited Error Handling** - Basic error states only
- **No Authentication** - No user management system

## 🎯 Future Enhancements

For a production version, consider:
- Real database integration
- User authentication system
- Actual payment gateway
- Advanced error handling
- Performance optimizations
- Comprehensive testing

## 📄 License

MIT License - This is a prototype for demonstration purposes.

---

<div align="center">
  <p><strong>🚧 Prototype Version - Not Production Ready 🚧</strong></p>
  <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
</div>