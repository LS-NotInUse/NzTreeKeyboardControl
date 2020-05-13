import {AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {NzFormatEmitEvent, NzTreeComponent, NzTreeNode, NzTreeNodeBaseComponent} from 'ng-zorro-antd';
import {staticNodeOptions} from './tree-node-options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('aTree') public treeComponent?: NzTreeComponent;
  @ViewChild('aTree', {read: ElementRef}) public treeRef?: ElementRef<HTMLElement>;

  public treeNodeOptions = staticNodeOptions;
  public searchValue = '';

  private treeInputElement?: HTMLInputElement;
  private focusedNode?: NzTreeNode;

  private readonly boundEvents: Array<() => void> = [];
  constructor(private readonly renderer: Renderer2) {}

  // prettier-ignore
  public ngAfterViewInit(): void {
    this.focusedNode = this.treeComponent?.getTreeNodes()[0];
    this.treeInputElement = this.treeRef?.nativeElement.querySelector('input') as HTMLInputElement;
    this.boundEvents.push(this.renderer.listen(
      this.treeInputElement, 'focus', (event: FocusEvent) => { if (event.relatedTarget !== null) { this.treeFocus(); } }
    ));
    this.boundEvents.push(this.renderer.listen(this.treeInputElement, 'blur', () => { this.treeFocus(false); }));
  }
  public ngOnDestroy(): void {
    // prettier-ignore
    for (const unbind of this.boundEvents) { unbind(); }
  }

  // eslint-disable-next-line max-lines-per-function, complexity
  public onKeyDown(key: string): void {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Escape', '*', '+', '-'].includes(key)) {
      return;
    }

    const currentFocusedNode = this.focusedNode as NzTreeNode;
    const parentNode = currentFocusedNode.parentNode;
    const sibling = (parentNode === null ? this.treeComponent?.getTreeNodes() : parentNode.children) as Array<NzTreeNode>;
    const nodeIndex = sibling.findIndex((x: NzTreeNode) => x.key === currentFocusedNode.key);
    let focusOrBlur = true;

    currentFocusedNode.isSelected = false;
    // prettier-ignore
    switch (key) {
      case 'ArrowUp': keyArrowUp.call(this); break;
      case 'ArrowDown': keyArrowDown.call(this); break;
      case 'ArrowLeft': keyArrowLeft.call(this); break;
      case 'ArrowRight': keyArrowRight.call(this); break;
      case 'Enter': keyEnter.call(this); break;
      case 'Escape': focusOrBlur = false; break;
      case '*': this.recursivelyNodeCollapseExpand(currentFocusedNode, true, false); break;
      case '+': this.recursivelyNodeCollapseExpand(currentFocusedNode, false, false); break;
      case '-': this.recursivelyNodeCollapseExpand(currentFocusedNode); break;
      default: break;
    }
    this.treeFocus(focusOrBlur, true);

    function keyArrowUp(this: AppComponent): void {
      // eslint-disable-next-line arrow-body-style
      const recursivelyGetPreviousNode = (targetNode: NzTreeNode): NzTreeNode => {
        return targetNode.isExpanded && targetNode.children.length > 0
          ? recursivelyGetPreviousNode(targetNode.children[targetNode.children.length - 1])
          : targetNode;
      };

      this.focusedNode = nodeIndex > 0 ? recursivelyGetPreviousNode(sibling[nodeIndex - 1]) : parentNode ?? this.focusedNode;
    }
    function keyArrowDown(this: AppComponent): void {
      // eslint-disable-next-line complexity
      const recursivelyGetNextNode = (
        targetNode: NzTreeNode,
        rollbackToParent: boolean = false,
        skipChildren: boolean = false
      ): NzTreeNode | null => {
        const tmpParent = targetNode.parentNode;
        const tmpSibling = tmpParent ? tmpParent.children : (this.treeComponent?.getTreeNodes() as Array<NzTreeNode>);
        const tmpIndex = tmpSibling.findIndex((x: NzTreeNode) => x.key === targetNode.key);

        if (rollbackToParent) {
          return tmpIndex < tmpSibling.length - 1 ? targetNode : tmpParent ? recursivelyGetNextNode(tmpParent, true) : null;
        } else if (targetNode.isExpanded && targetNode.children.length > 0 && !skipChildren) {
          return targetNode.children[0];
        } else if (tmpIndex < tmpSibling.length - 1) {
          return tmpSibling[tmpIndex + 1];
        } else if (tmpParent) {
          const tmpRollback = recursivelyGetNextNode(tmpParent, true);

          return tmpRollback ? recursivelyGetNextNode(tmpRollback, false, true) : null;
        } else {
          return null;
        }
      };

      this.focusedNode = recursivelyGetNextNode(currentFocusedNode) ?? this.focusedNode;
    }
    function keyArrowRight(this: AppComponent): void {
      if (!currentFocusedNode.isExpanded && currentFocusedNode.children.length > 0) {
        this.recursivelyNodeCollapseExpand(currentFocusedNode, false, false);
      } else {
        keyArrowDown.call(this);
      }
    }
    function keyArrowLeft(this: AppComponent): void {
      if (currentFocusedNode.isExpanded) {
        this.recursivelyNodeCollapseExpand(currentFocusedNode);
      } else {
        this.focusedNode = parentNode ? parentNode : this.treeComponent?.getTreeNodes()[0];
      }
    }
    function keyEnter(this: AppComponent): void {
      if (currentFocusedNode.isLeaf) {
        return;
      }

      if (currentFocusedNode.isExpanded) {
        this.recursivelyNodeCollapseExpand(currentFocusedNode);
      } else {
        this.recursivelyNodeCollapseExpand(currentFocusedNode, false, false);
      }
    }
  }

  public onTreeNodeClick(event: NzFormatEmitEvent): void {
    const clickedNode = event.node as NzTreeNode;

    if (this.focusedNode !== clickedNode) {
      (this.focusedNode as NzTreeNode).isSelected = false;
      this.focusedNode = clickedNode;
    }
    this.treeFocus();
  }

  public onTreeNodeDblClick(event: NzFormatEmitEvent): void {
    if (!event.node?.isLeaf && event.node) {
      this.recursivelyNodeCollapseExpand(event.node, event.node?.isExpanded, event.node?.isExpanded);
    }
  }

  public treeFocus(focusOrBlur: boolean = true, scrollIntoView: boolean = false): void {
    if (focusOrBlur) {
      this.treeInputElement?.focus();
      if (scrollIntoView) {
        // scroll after expand or collapse is finished
        setTimeout(() => {
          (this.focusedNode?.component as TreeNodeComponent)?.elementRef.nativeElement
            .querySelector('nz-tree-node-switcher')
            ?.scrollIntoView({block: 'nearest', inline: 'nearest'});
        });
      }
    } else {
      this.treeInputElement?.blur();
    }
    (this.focusedNode as NzTreeNode).isSelected = focusOrBlur;
  }

  private recursivelyNodeCollapseExpand(treeNode: NzTreeNode, recursive: boolean = true, collapseOrExpand: boolean = true): void {
    if (treeNode.isExpanded === collapseOrExpand || (!collapseOrExpand && recursive)) {
      treeNode.isExpanded = !collapseOrExpand;
      if (recursive) {
        for (const childNode of treeNode.children) {
          this.recursivelyNodeCollapseExpand(childNode, recursive, collapseOrExpand);
        }
      }
    }
  }
}

interface TreeNodeComponent extends NzTreeNodeBaseComponent {
  elementRef: ElementRef<HTMLElement>;
}
