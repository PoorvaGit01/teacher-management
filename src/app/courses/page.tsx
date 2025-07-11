"use client";

import React, { useMemo, useState } from "react";
import { Search, BookOpen, Filter, Award, Languages } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { teachers } from "@/constants/teachersData";
import { courses } from "@/constants/courseData";
import { CourseCard } from "@/components/cards/CourseCard";
import { TeacherCard } from "@/components/cards/TeacherCard";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { StatsBlock } from "@/components/cards/StackBlock";
import { Course, Teacher } from "@/constants/types";
import { PaymentModal } from "@/components/forms/PaymentModals";

const categories = ["All", "Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"];
const levels = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];
const sortOptions = ["Popular", "Price: Low to High", "Price: High to Low", "Rating", "Newest"];

const CoursePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    course: Course | null;
    teacher: Teacher | null;
  }>({
    isOpen: false,
    course: null,
    teacher: null
  });

  const filteredCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const search = searchQuery.toLowerCase();
      return (
        (course.title.toLowerCase().includes(search) ||
          course.description.toLowerCase().includes(search) ||
          course.topics.some(topic => topic.toLowerCase().includes(search))) &&
        (selectedCategory === "All" || course.category === selectedCategory) &&
        (selectedLevel === "All" || course.level === selectedLevel)
      );
    });

    switch (sortBy) {
      case "Price: Low to High": return filtered.sort((a, b) => a.price - b.price);
      case "Price: High to Low": return filtered.sort((a, b) => b.price - a.price);
      case "Rating": return filtered.sort((a, b) => b.rating - a.rating);
      case "Newest": return filtered.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
      default: return filtered.sort((a, b) => b.totalStudents - a.totalStudents);
    }
  }, [searchQuery, selectedCategory, selectedLevel, sortBy]);

  const handleEnrollClick = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    const teacher = teachers.find(t => t.id === course?.teacherId);
    
    if (course && teacher) {
      setPaymentModal({
        isOpen: true,
        course,
        teacher
      });
    }
  };

  const handleClosePaymentModal = () => {
    setPaymentModal({
      isOpen: false,
      course: null,
      teacher: null
    });
  };

  const handleAction = {
    enroll: handleEnrollClick,
    teacher: (id: string) => {
      console.log("View teacher:", id);
    },
    wishlist: (id: string) => {
      setWishlist(prev => 
        prev.includes(id) 
          ? prev.filter(i => i !== id) 
          : [...prev, id]
      );
    },
    share: (id: string) => {
      if (navigator.share) {
        navigator.share({ 
          title: "Check out this course!", 
          url: `${window.location.origin}/course/${id}` 
        });
      } else {
        navigator.clipboard.writeText(`${window.location.origin}/course/${id}`);
        console.log("Course link copied to clipboard!");
      }
    },
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLevel("All");
    setSortBy("Popular");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Explore Courses</h1>
            <Badge variant="secondary" className="hidden sm:flex">
              {filteredCourses.length} courses
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                placeholder="Search courses..." 
                className="pl-10" 
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {filteredCourses.length === 0 ? (
          <div className="text-center max-w-md mx-auto">
            <Card className="p-8">
              <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No courses found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filters.</p>
              <Button variant="outline" onClick={clearAllFilters}>
                Clear all filters
              </Button>
            </Card>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {searchQuery ? `Results for "${searchQuery}"` : "All Courses"}
              </h2>
              <div className="hidden sm:flex items-center text-sm text-gray-500">
                <Filter className="w-4 h-4 mr-1" />
                Sorted by {sortBy}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  teacher={teachers.find(t => t.id === course.teacherId)!}
                  teacherClick={handleAction.teacher}
                  enroll={handleAction.enroll}
                  share={handleAction.share}
                  wishlist={wishlist}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg">Load More Courses</Button>
            </div>
          </>
        )}
      </main>

      {/* Teachers Section */}
      <section className="bg-white border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Meet Our Expert Teachers</h2>
            <p className="text-gray-600">Learn from certified educators</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.filter(t => t.status === "Active").slice(0, 6).map(t => (
              <TeacherCard key={t.id} teacher={t} onClick={handleAction.teacher} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">View All Teachers</Button>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Explore by Category</h2>
            <p className="text-gray-600">Find courses in your area of interest</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map(cat => (
              <CategoryCard 
                key={cat} 
                name={cat} 
                count={courses.filter(c => c.category === cat).length} 
                onClick={() => setSelectedCategory(cat)} 
              />
            ))}
          </div>
        </div>
      </section>

      <StatsBlock
        courseCount={courses.length}
        teacherCount={teachers.filter(t => t.status === "Active").length}
        studentCount={courses.reduce((sum, c) => sum + c.totalStudents, 0)}
        avgRating={4.8}
      />

      {paymentModal.course && paymentModal.teacher && (
        <PaymentModal
          isOpen={paymentModal.isOpen}
          onClose={handleClosePaymentModal}
          course={paymentModal.course}
          teacher={paymentModal.teacher}
        />
      )}
    </div>
  );
};

export default CoursePage;