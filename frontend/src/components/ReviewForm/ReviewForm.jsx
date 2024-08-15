
import React from 'react'

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function ReviewForm() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 text-[#ffd700]">
            <StarIcon className="h-6 w-6 fill-[#ffd700]" />
            <StarIcon className="h-6 w-6 fill-[#ffd700]" />
            <StarIcon className="h-6 w-6 fill-[#ffd700]" />
            <StarIcon className="h-6 w-6 fill-[#ffd700]" />
            <StarIcon className="h-6 w-6 fill-[#ffd700]" />
          </div>
          <span className="text-2xl font-bold">4.3</span>
        </div>
        <span className="text-sm text-muted-foreground">Based on 127 reviews</span>
      </div>
      <div className="grid gap-6">
        <div>
          <h3 className="text-lg font-semibold">Write a review</h3>
          <form className="grid gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Your rating:</span>
              <div className="flex items-center gap-0.5 text-[#ffd700]">
                <StarIcon className="h-5 w-5 cursor-pointer fill-[#ffd700]" />
                <StarIcon className="h-5 w-5 cursor-pointer fill-[#ffd700]" />
                <StarIcon className="h-5 w-5 cursor-pointer fill-[#ffd700]" />
                <StarIcon className="h-5 w-5 cursor-pointer fill-[#ffd700]" />
                <StarIcon className="h-5 w-5 cursor-pointer fill-[#ffd700]" />
              </div>
            </div>
            <Textarea placeholder="Write your review here..." className="resize-none" rows={4} />
            <Button type="submit" size="sm" className="w-[200px] h-11">
              Submit Review
            </Button>
          </form>
        </div>
        <div className="recent-reviews">
          <h3 className="text-lg font-semibold">Recent Reviews</h3>
          <div className="grid gap-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5 text-[#ffd700]">
                    <StarIcon className="h-5 w-5 fill-[#ffd700]" />
                    <StarIcon className="h-5 w-5 fill-[#ffd700]" />
                    <StarIcon className="h-5 w-5 fill-[#ffd700]" />
                    <StarIcon className="h-5 w-5 fill-[#ffd700]" />
                    <StarIcon className="h-5 w-5 fill-[#ffd700]" />
                  </div>
                  <span className="text-sm text-muted-foreground">2 days ago</span>
                </div>
                <p className="text-sm leading-loose text-muted-foreground">
                  I've been experimenting with my LuminaCook Multi-Function Air Fryer for a few weeks now, and it's been
                  a versatile addition to my kitchen. It's great for making crispy fries, chicken wings, and even some
                  healthier options.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5 text-[#ffd700]">
                    <StarIcon className="h-5 w-5 fill-[#ffd700]" />
                    <StarIcon className="h-5 w-5 fill-[#ffd700]" />
                    <StarIcon className="h-5 w-5 fill-[#ffd700]" />
                    <StarIcon className="h-5 w-5 fill-[#ffd700]" />
                    <StarIcon className="h-5 w-5 fill-[#ffd700]" />
                  </div>
                  <span className="text-sm text-muted-foreground">3 weeks ago</span>
                </div>
                <p className="text-sm leading-loose text-muted-foreground">
                  The battery life is impressive, lasting me for long-haul flights without any issues. They are
                  comfortable to wear for extended periods, and I appreciate the sleek design. Worth every penny, and
                  I'd recommend these headphones to anyone who values high-quality audio and peace and quiet.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5 text-[#ffd700]">
                    <StarIcon className="h-5 w-5 fill-[#ffd700]" />
                    <StarIcon className="h-5 w-5 fill-[#ffd700]" />
                    <StarIcon className="h-5 w-5 fill-[#ffd700]" />
                    <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">1 month ago</span>
                </div>
                <p className="text-sm leading-loose text-muted-foreground">
                  The product is decent, but not as great as I expected. It works well for basic tasks, but I wish it
                  had more advanced features. Overall, it's an average product.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5 text-[#ffd700]">
                    <StarIcon className="h-5 w-5 fill-[#ffd700]" />
                    <StarIcon className="h-5 w-5 fill-[#ffd700]" />
                    <StarIcon className="h-5 w-5 fill-[#ffd700]" />
                    <StarIcon className="h-5 w-5 fill-[#ffd700]" />
                    <StarIcon className="h-5 w-5 fill-[#ffd700]" />
                  </div>
                  <span className="text-sm text-muted-foreground">2 months ago</span>
                </div>
                <p className="text-sm leading-loose text-muted-foreground">
                  I absolutely love this product! It has exceeded all my expectations. The quality is top-notch, and it
                  has made my life so much easier. I highly recommend it to anyone looking for a reliable and versatile
                  solution.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="reviews-pagination">
        <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination></div>
      </div>
    </div>


  )
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}